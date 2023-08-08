let mongoose = require("mongoose")

let firstschema = new mongoose.Schema({
    pname:String,
    number:Number,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    cpassword:String,
    isVerified:String,
    token:String,
    role:String,
    signupSource:String
})

let firstscheme = mongoose.model("userRegisterdata",firstschema)

module.exports = firstscheme
