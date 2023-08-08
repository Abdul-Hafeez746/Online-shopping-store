const secondscheme = require("../models/schema")
const firstscheme = require("../models/userRegister")
const activityscheme = require("../models/activity")
let multer = require("multer")



exports.homepageproducts = async(req,res)=>{
  let data = await secondscheme.find().limit(4)
   console.log("The Data in DB IS "+data)
   if(data.length===0){
     res.json({msg:"Data Not Found"})
   }else{
    res.send(data)
   }
}


exports.getProducts = async(req,res)=>{
  let data = await secondscheme.find()
  //  console.log("The Data in DB IS "+data)
   if(data.length==0){
     res.json({msg:"Data Not Found"})
     console.log("Data Not Found")
   }else{
    res.send(data)
   }
}

exports.addActivity = async(req,res)=>{
  console.log(req.user);
  let data = new activityscheme({
    pname : req.body.pname,
    description : req.body.description,
    price:req.body.price,
    image:req.file.filename,  
    colors:req.body.colors,
    category:req.body.category,
    userId:req.user,
  })
   console.log("The Data Added To The Db Is "+data)
  let result = await data.save()
  res.send(result)
}

exports.showActivity = async(req,res)=>{
  let id = req.user
  console.log(id);
  let data = await activityscheme.find({userId:id})
   console.log("The Data in DB IS "+data)
   res.send(data);
}

exports.getUpdateActivity = async(req,res)=>{
  let result = await activityscheme.findOne({_id:req.params.id})
  // let result = await activityscheme.findById(req.params.id)    //mongoose
  console.log(result)
  if(result){
    res.send(result)
  }else{
    res.json({msg:"Data Could Not Be Found"})
  }
 }



 exports.updateActivity = async(req,res)=>{
  try{
      let result = await activityscheme.updateOne({_id:req.params.id},{
      $set:{
      pname : req.body.pname,
      description : req.body.description,
      price:req.body.price,
      image:req.file.filename,  
      colors:req.body.colors,
      category:req.body.category,
      }
      })        
      // let result = await activityscheme.findByIdAndUpdate(req.params.id,req.body)    //mongooose   => must know runValidator
   res.json(result);
  }
  catch(e){
   console.log(e)
  }
}

 exports.deleteActivity =  async(req,res)=>{
  let result = await activityscheme.deleteOne({_id:req.params.id})
//  let result = await activityscheme.findByIdAndDelete(req.params.id)   //mongoose
  if(res){
    res.send(result)
  }else{
    res.send({"msg":"The Data Could ot Be Deleted"})
  }
 
}


exports.allUsersActivity = async(req,res)=>{
  let result = await activityscheme.find()
//  let result = await activityscheme.find({})     // mpngosse

  console.log(result)
  if(result){
    for(var i=0;i<result.length;i++){
    console.log(result[i].userId)
    let _id = result[i].userId
    let user = await firstscheme.find({_id:_id})
       for(var j=0;j<user.length;j++){
         console.log(user[j].pname)
    }
  }
  res.json({result})
  // res.send(result)
 }else{
   res.send({"msg":"Data Could Not Be Found"})
}
}
