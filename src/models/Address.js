const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"]
    },
    houseNumber:{
        type:Number,
        required:true,
        trim:true
    },
    street:{
        type:String,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        required:true,
        trim:true
    },
    pincode: {
      type: String,
      required: true,
      match: [/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit pincode"],
    },
    note:{
        type:String,
        
    },
    isDefault: {
      type: Boolean,
      default: false,   
    },

},{timestamps:true})

module.exports = mongoose.model("Address",addressSchema)