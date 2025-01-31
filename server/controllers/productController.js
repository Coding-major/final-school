const mongoose = require("mongoose")
const Product = require("../models/product")
const Review = require("../models/review")
const AdditionalImage = require("../models/additionalImages")
const cloudinary = require("cloudinary").v2
const { StatusCodes} = require("http-status-codes")
const path = require("path")
const {
    customError,
    notFound,
    unAuthorized,
    badRequest,
    forbidden
} = require("../errors/indexErrors")
const checkPermissions = require("../utils/checkpermisions")
const { count } = require("console")

const createProduct = async (req, res) => {
    const session = await mongoose.startSession()
        
    //req.body.user = req.user.userID;
    //const theUser = req.user.userID;
    var { name, price, description, category, company, inventory } = req.body;
    const mainImage = req.files?.mainImage;
    const otherImages = req.files?.additionalImages;
    
    if (!name) {
        throw new badRequest("please specify name")
    }
    if (!price) {
        throw new badRequest("please specify price")
    }
    if (!description) {
        throw new badRequest("please describe the product")
    }
    if (!category) {
        throw new badRequest("please specify category")
    }
    if (!company) {
        throw new badRequest("please specify company")
    }
    // if (!freeShipping) {
    //     throw new badRequest("please specify if the shipping is free or not")
    // }
    if (!inventory) {
        throw new badRequest("please specify how many product are available")
    }

    if (inventory) {
        if (typeof inventory !== "number") {
            inventory = Number(inventory)
            if (isNaN(inventory)) {
                throw new badRequest("please should be a number")
            }
            if (inventory <= 0) {
                throw new badRequest("inventory should be a positive number")
            }
        } else if (inventory <= 0) {
            throw new badRequest("inventory should be a positive number")
        }
    }

    // if (!mainImage) {
    //     throw new badRequest("please upload an image for the product")
    // }

    if (name) {
        console.log("NNNNNNNNNN");
        
        //check if image gotten from front-end is array, if not make it array
        const otherImagesArray = Array.isArray(otherImages) ? otherImages : [otherImages]

        // if (otherImagesArray.length !== 5 ) {
        //     throw new badRequest("The additional image should be five(5)")
        // }

        //map through each picture and store it on cloudinary using promise
        //now we get the promise
        // session.startTransaction();
        
        // const result = await cloudinary.uploader.upload(mainImage.tempFilePath, {
        //     folder: "my-uploads",
        //     use_filename: true
        // })
        // if (!result) {
        //     console.log("no no no");
            
        // }
        var resultUrls = ["ndh", "pppp", "oooo"]

        console.log("ooooooooooooooo");
        // console.log(resultUrl);
        
        

        // const imagesPromises = otherImagesArray.map((image, index) => {
        //     return cloudinary.uploader.upload(image.tempFilePath, {
        //         folder: "my-uploads",
        //         use_filename: true
        //     })
        // })
        // //impementing the promise
        // const promiseResult = await Promise.all(imagesPromises)


        // //storing the url of each cloudinary result to an array
        // var resultUrls = promiseResult.map((result, index) => {
        //     return result.secure_url
        // })
        
        const product = await Product.create({
            name,
            price,
            description,
            category,
            company,
            inventory,
            mainImage,
            additionalImages: resultUrls
        })

        const filteredProduct = {
            name: product.name,
            price: product.price,
            description: product.description,
            company: product.company,
            category: product.category,
            inventory: product.inventory,
            mainImage: product.mainImage,
            additionalImages: product.additionalImages
        }
        
        res.status(StatusCodes.CREATED).json({msg: filteredProduct})
        
    }


    
    // const result = await cloudinary.uploader.upload(mainImage.tempFilePath, {
    //     folder: "my-uploads",
    //     use_filename: true
    // })

    // const resultUrl = result.secure_url

    // const product = await Product.create({
    //     name,
    //     price,
    //     description,
    //     category,
    //     company,
    //     freeShipping,
    //     inventory,
    //     image: resultUrl
    // })

}


const filteredProducts = async (req, res) => {
    const { name, company, category } = req.query;
    
    
  
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' }; // Case-insensitive match
    if (company) query.company = { $regex: company, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };
  
    try {
      const products = await Product.find(query);
      res.json({msg: products});
    } catch (error) {
      res.status(500).send({msg: 'Server Error'});
    }
}

const getAllProducts = async (req, res) => {
    const {page, limit, category} = req.query;
    
    
    
    const limitValue = parseInt(limit)
    const categories = [
        "automotive", "beauty", "electronics", "fashion", "groceries",
        "health", "homes", "office", "pet", "school", "sports", "toys"
    ];

    if (category === "start") {
    
        const productPromises = categories.map((category) => {
            return Product.find({category})
                .limit(limitValue)
                .select("name price description category")
                .exec();
            
        });
    
    
        // Wait for all category fetches to complete
        const productsByCategory = await Promise.all(productPromises);
        
      
        // Send the fetched products for each category
        const response = categories.map((category, index) => ({
          category,
          page: limitValue,
          products: productsByCategory[index]
        }));
    
        
    
        // const products = await Product.find({})
        // if (!products) {
        //     throw new notFound("no products to display")
        // }
        return res.status(StatusCodes.OK).json({msg: response})
    }

    if (categories.includes(category)) {
        console.log(category);
        
        const products = await Product.find({category})
            .skip(page)
            .limit(limitValue)
            .select("name price description category")
            .exec();

        // const nextPage = page + 1
        const resultProducts = {
            page: products.length,
            products
        }
        // console.log(products);
        console.log(products.length);
        
        
        return res.status(StatusCodes.OK).json({msg: resultProducts})
    }

    
    
    
}

const getMyProducts = async (req, res) => {
    const theUser = req.user.userID
    const products = await Product.find({user: theUser}).populate("reviews")
    if (!products) {
        throw new notFound("no products to display")
    }

    res.status(StatusCodes.OK).json({msg: products})
}



const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id}).populate("reviews")
    if (!product) {
        throw new notFound("No product to display")
    }

    console.log(product);
    
    res.status(StatusCodes.OK).json({msg: product})
}

const updateProduct = async (req, res) => {
    const product = await Product.findOneAndUpdate({_id: req.params.id, user: req.user.userID}, req.body, {
        new: true,
        runValidators: true
    })

    if (!product) {
        throw new notFound("No product to the specified id to update")
    }

    res.status(StatusCodes.OK).json({msg: product})
}

const deleteProduct = async (req, res, next) => {
    const theUser = req.user.userID
    const product = await Product.findOneAndDelete({_id: req.params.id, user: req.user.userID})

    if(!product) {
        throw new notFound("No product with the id to delete")
    }

    // const review = await Review.deleteMany({product: product._id})
    //res.status(StatusCodes.OK).json({msg: "delete succesfull"})

    next()
}

// const uploadImage = async (req, res) => {
    
    
//     if(!req.files) {
//         throw new badRequest("No file uploaded")
//     }

//     const productImage = req.files.image
//     const maxSize = 1024 * 1024
//     const imagePath = path.join(__dirname, `../public/uploads/${productImage.name}`);

//      if (!productImage.mimetype.startsWith("image")) {
//         throw new badRequest("please upload image instead")
//      }

//      if (productImage.size > maxSize) {
//         throw new badRequest("please upload an image less than 1MB")
//      }

//      await productImage.mv(imagePath)

//     res.status(StatusCodes.OK).json({msg: "successful"})
// }

const getSingleProductReviews = async (req, res) => {
    const {id} = req.params
    console.log(id);
    

    const review = await Review.find({product: id}).select("rating comment name")
    console.log(review);
    res.status(StatusCodes.OK).json({msg : {review, count: review.length}})
}
//review, count: review.length

module.exports = {
    createProduct,
    filteredProducts,
    getAllProducts,
    getMyProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getSingleProductReviews
}
