const firstscheme = require("./models/userRegister")

let userData = require("./userregisterdatasAPI.json")

let start = async() => {
 try{
  await firstscheme.create(userData)
  console.log("success:User Data Created")
 }catch(error){
    console.log(error)
 }
}

module.exports = start
