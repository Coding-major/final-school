const mongoose = require("mongoose")

const AdditionalImageSchema = new mongoose.Schema({
    imageUrl: {
        type: String
    },

    // user: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },

    // product: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Product",
    //     required: true
    // },

    
},
{timestamps: true}
)

module.exports = mongoose.model("AdditionalImage", AdditionalImageSchema)