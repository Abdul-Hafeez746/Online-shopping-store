let mongoose = require("mongoose")

let activityschema = new mongoose.Schema({
    pname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{                //whwnever you are doing crud with image never make schema of the same name of input field of image cause it will create problems in fufture , but you have to make sure the upload. single key value and your input field name will be same
        type:String,
        require:true
    },
    // email:{
    //     type:String,
    //     required:true
    // },
    // gender:{
    //     type:String,
    //     required:true
    // },
    colors:{
        type:Array,
    },
    category:{
        type:String,
        required:true
    },
    // address:{
    //     type:String,
    //     required:true
    // },
    // password:{
    //     type:String,
    //     required:true
    // },
    // cpassword:{
    //     type:String,
    //     required:true
    // }
    userId:{
        type:String,
        required:true
    }
},{timestamps:true}
)

let activityscheme = mongoose.model("activity",activityschema)

module.exports = activityscheme
