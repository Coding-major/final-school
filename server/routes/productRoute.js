const express = require("express")
const router = express.Router()
const {
    createProduct,
    filteredProducts,
    getAllProducts,
    getMyProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getSingleProductReviews
} = require("../controllers/productController")

const {
    authenticateUser,
    authorizeUser,
    authorizeGettingSingleUSer
} = require("../middlewares/unAuthorized")

const {deleteMany} = require("../controllers/reviewController")

//authenticateUser, 
router
    .route("/")
    .post(authenticateUser, createProduct)
    .get(getAllProducts)


router.route("/filteredProducts").get(filteredProducts)
router.route("/myproducts").get(authenticateUser, getMyProducts)

    
// router.route("/uploadimage").post(uploadImage)

router
    .route("/:id")
    .get(getSingleProduct)
    .patch(authenticateUser, authorizeGettingSingleUSer(), updateProduct)
    .delete(authenticateUser, authorizeUser("admin", "user"), deleteProduct, deleteMany)

router.route("/:id/reviews").get(getSingleProductReviews);


module.exports = router

//authenticateUser, authorizeUser("admin"), 

