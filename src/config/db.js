const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("addres db connnected successfully")
    })
    .catch((error)=>{
        console.log('db not connected :',error )
        process.exit(1)
    })
}

module.exports = connectDB