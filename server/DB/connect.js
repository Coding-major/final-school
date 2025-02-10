const mongoose = require("mongoose")

// const connectionString = "mongodb://localhost:27017/E-commerce"
//i did the mongo connection
const connectDB = (url) => {
    // return mongoose.connect(connectionString)
    return mongoose.connect(process.env.ATLAS)
}

module.exports = connectDB;