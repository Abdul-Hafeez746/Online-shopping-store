const secondscheme = require("../models/schema")
const firstscheme = require("../models/userRegister")
const activityscheme = require("../models/activity")
const { TokenExpiredError } = require("jsonwebtoken")


exports.addProduct = async(req,res)=>{
    try{
     let dataindb = new secondscheme({
         pname : req.body.pname,
         description : req.body.description,
         price:req.body.price,
         image:req.file.filename,  
         colors:req.body.colors,
         category:req.body.category,
     })
     let result = await dataindb.save()
     res.json(result)
    }
    catch(e){
     console.log(e)
    }
 }



  exports.updateProduct = async(req,res)=>{
    let result = await secondscheme.findOne({_id:req.params.id})
    console.log(result)
    if(result){
      res.send(result)
    }else{
      res.json({msg:"Data Could Not Be Found"})
    }
   }

   
  exports.updateProductFinaly = async(req,res)=>{
    try{
        let result = await secondscheme.updateOne({_id:req.params.id},{
        $set:{
       
        }
        })     //whenever there is a image we will write it as it is
     
    //  let response = await result.save();    //ther is o need to save it cause set is doing the same thing
    //  res.json(response);
     res.json(result);
    }
    catch(e){
     console.log(e)
    }
 }


 exports.deleteProduct = async(req,res)=>{
    let result = await secondscheme.deleteOne({_id:req.params.id})
    if(res){
      res.send(result)
    }else{
      res.json({msg:"The Data Could ot Be Deleted"})
    }
   
  }


exports.multipleDeleteProduct = async(req,res)=>{
  let allId = req.body        //req.body / req.param / req.query always take or give objects they dont identify arrays
  // let allIds = req.body.ids        //req.body / req.param / req.query always take or give objects they dont identify arrays
  console.log(allId)
  let allIds = allId.ids
  console.log(allIds)

  let result = await secondscheme.deleteMany({ _id: { $in: allIds } });
  res.send(result) 
}

exports.allproductsDelete = async(req,res)=>{
  let result = await secondscheme.deleteMany({});
  res.send(result)
 
}