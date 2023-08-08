let mongoose = require("mongoose")
require("dotenv").config()


mongoose.set("strictQuery",false)


let mongoDB = async()=> {
    try{
    let conn =  await mongoose.connect("mongodb://127.0.0.1:27017/OnlineStore");
    console.log(`MongoDB Connected Successsfully : ${conn.connection.host}`);
    // console.log(conn)
    }
    catch(error){
        console.log("mongodb error is",error)
        process.exit(1)
    }
}



// mongoose.connect("mongodb://127.0.0.1/crud")
// .then(()=>{console.log("Connection Established Successfully")})
// .catch(()=>{console.error("Error!!! Coneection Failed")})



// let mongodb = async()=> {
//     try{
//     let conn = await mongoose.connect(process.env.MONGODB_URI)
//     console.log(`mongodb connected: ${conn.cennection.host}`) 
//     }
//     catch(error){
//         console.log(error)
//         process.exit(1)
//     }
// }

module.exports = mongoDB