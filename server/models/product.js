const mongoose = require("mongoose")
const validator = require("validator")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide the name for the product"],
        minlength: 3,
        maxlength: 50
    },

    price: {
        type: Number,
        required: [true, "please provide the price "]
    },

    description: {
        type: String,
        required: [true, "Description is a must, so provide it"],
        maxlength: [2000, "description cannot be more than 1000 characters"]
    },

    mainImage: {
        type: String,
        default: "/uploads/store.jpeg"
    },
    
    category: {
        type: String,
        required: [true, "please provide the category"],
        enum: ["automotive", "beauty", "electronics", "fashion", "groceries", "health", "homes", "office", "pet", "school", "sports", "toys"]
    },

    company: {
        type: String,
        required: [true, "please provide the comapny name"],
        // enum: {
        //     values: ["gucci", "prada", "versace", "balenciaga"],
        //     message: ""
        // }
    },


    featured: {
        type: Boolean,
        default: false
    },

    freeShipping: {
        type: Boolean,
        default: true
    },

    inventory: {
        type: Number,
        required: [true, "please provide an email"],
        default: 1
    },

    averageRating: {
        type: Number,
        default:0
    },

    numberOfReviews: {
        type: Number, 
        default: 0
    },

    additionalImages: {
        type: [String]
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},

{timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }}
)

ProductSchema.virtual('reviews', {
    ref: "Review",
    localField: "_id",
    foreignField: "product",
    justOne: false
})

// ProductSchema.pre("findOneAndDelete", async function() {
//     await mongoose.model('Review').deleteMany({product: this._id})
// })

module.exports = mongoose.model("Product", ProductSchema)