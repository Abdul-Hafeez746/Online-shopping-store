const jwt = require("jsonwebtoken");
const firstscheme = require("../models/userRegister")
require("dotenv").config()

const isAdmin = async(req, res, next)=>{
  try{
    // Get the user role from the request object or database (depending on how you store it)
    let token = req.headers['authorization'];
    // const userId = await req.user;
    let decode = jwt.verify(token,process.env.SECRET_KEY);
    console.log(decode)
    let role = decode.role
    let user = decode.userId
    if(role==="admin"){
    let roleinDB = await firstscheme.find({_id:user})
    // Check if the user is an admin
    for(var i=0;i<roleinDB.length;i++){
    console.log("token role",role)
    console.log("roleinDB",roleinDB[i].role)
    console.log("env role",process.env.Role)
    let dbRole = roleinDB[i].role
    if (role ==="admin" && role === dbRole && dbRole === "admin") {
       next()
    }else{
      return res.status(401).json({ msg:"You Are Not Authorized"});
    }
    }
    // If the user is an admin, move on to the next middleware function
    }else{
      return res.status(401).json({ msg:"You Are Not Authorized"});
    }
  }catch (err) {
    // If there's an error with the JWT token, return a 401 status code with an error message
    return res.status(401).json({ msg: "You are not authorized to access this resource." });
  }
  }
  
module.exports={isAdmin}