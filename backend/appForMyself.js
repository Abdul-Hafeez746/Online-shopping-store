  let express = require("express")
  // const secondscheme = require("./models/schema")
  const firstscheme = require("./models/userRegister")
  // const activityscheme = require("./models/activity")
  const jwt = require("jsonwebtoken");
  // let multer = require("multer")
  let nodemailer = require("nodemailer")
  let MailGen = require("mailgen")
  let mongoDB = require("./database/connection")
  let cors = require("cors")
  let app = express()
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use("/uploads",express.static('./uploads'))
  app.use(cors())
  require("dotenv").config()
  let mrgn= require("morgan")
  var validator = require('validator');
  const start = require("./userDB");
  const Begin = require("./cardsDB")
  // let {auth} = require("./middleware/auth")
  // let {isAdmin} = require("./middleware/isAdmin")
  let userRouter = require("./router/user.index")
  let adminRouter = require("./router/admin.index")
  let bcrypt = require("bcrypt")
  let crypt = require("crypto")




//log request
// app.use(mrgn("tiny"))
app.use(mrgn("dev"))



// Database Connected
   mongoDB()
//Fake User data API added to db
  //  start()
//Fake cards data API added to db
  //  Begin()



  app.use("/user",userRouter)
  app.use("/admin",adminRouter)






  //Learning Query tehnique
  app.get("/query",async(req,res)=>{
    console.log("running")
    req.query
    console.log(req.query)
    let result = req.query
    let name = req.query.name
    let age = req.query.age
  
    res.json({result,name,age})
  })


// Home product Api
  // app.get("/addproducthome",async(req,res)=>{
  //   let data = await secondscheme.find().limit(4)
  //    console.log("The Data in DB IS "+data)
  //    if(data.length===0){
  //      res.json({msg:"Data Not Found"})
  //    }else{
  //     res.send(data)
  //    }
  // })


  //For Cards CRUD
// let storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         // let imagepath = path.join(__dirname,"./uploads")
//         // cb(null,imagepath)

//         cb(null ,"./uploads")
//     },
//     filename: function(req,file,cb){
//         const newfilename = Date.now()+'-'+file.originalname;                                    
//         cb(null,newfilename)
//     }

// })

// let typefilter = (req,file,cb) => {
//     if(file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" ){
//         cb(null,true)
//     }else{
//         cb(new Error("File size must me leass than 1mb || Supported Formats png,jpg and jpeg"))
//     }

// }

// let maxSize = 1*1024*1024


// let upload = multer({
//     storage:storage,
//     fileFilter:typefilter,
//     limits:{fileSize:maxSize}
// })



// app.post("/addproduct",upload.single("image"),async(req,res)=>{
//    try{
//     let dataindb = new secondscheme({
//         pname : req.body.pname,
//         description : req.body.description,
//         price:req.body.price,
//         image:req.file.filename,  
//         colors:req.body.colors,
//         category:req.body.category,
//     })
//     let result = await dataindb.save()
//     res.json(result)
//    }
//    catch(e){
//     console.log(e)
//    }
// })





  // app.get("/addproduct",async(req,res)=>{
  //   let data = await secondscheme.find()
  //   //  console.log("The Data in DB IS "+data)
  //    if(data.length==0){
  //      res.json({msg:"Data Not Found"})
  //      console.log("Data Not Found")
  //    }else{
  //     res.send(data)
  //    }
  // })



  // app.get("/Updatecard/:id",async(req,res)=>{
  //   let result = await secondscheme.findOne({_id:req.params.id})
  //   console.log(result)
  //   if(result){
  //     res.send(result)
  //   }else{
  //     res.json({msg:"Data Could Not Be Found"})
  //   }
  //  })



//    app.put("/Updatecard/:id",upload.single("image"),async(req,res)=>{
//     try{
//         let result = await secondscheme.updateOne({_id:req.params.id},{
//         $set:{
//         pname : req.body.pname,
//         description : req.body.description,
//         price:req.body.price,
//         image:req.file.filename,  
//         colors:req.body.colors,
//         category:req.body.category,
//         }
//         })     //whenever there is a image we will write it as it is
     
//     //  let response = await result.save();    //ther is o need to save it cause set is doing the same thing
//     //  res.json(response);
//      res.json(result);
//     }
//     catch(e){
//      console.log(e)
//     }
//  })




  // app.delete("/Removecard/:id",async(req,res)=>{
  //   let result = await secondscheme.deleteOne({_id:req.params.id})
  //   if(res){
  //     res.send(result)
  //   }else{
  //     res.json({msg:"The Data Could ot Be Deleted"})
  //   }
   
  // })





  //signup
  
  
  
  
  
  
  app.post("/register",async(req,res)=>{
    let {pname,email,password,cpassword} = req.body
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password,salt);
    let data = new firstscheme({
      pname,
      email,
      password,
      cpassword
    })
    data.password=hashPassword
    data.cpassword=hashPassword
    if(pname.length>3){
    if(validator.isEmail(email)){
    const existingUser = await firstscheme.findOne({ email });
    if(!existingUser){
    let token = jwt.sign({userId:data._id},process.env.SECRET_KEY,process.env.OPTIONS,{
      expiresIn: '1h',
      algorithm: 'HS256'
    });
    data.isVerified="false"
    data.token=token
    data.role="user"
    console.log("The Data Added To The Db Is "+data)
    // let result = await data.save()
      if(email)
      {
    
        let reciever = email
         
        let config = {
          service: 'gmail',
          auth: {
            user: process.env.email,
            pass: process.env.EMAIL_PASSWORD
      }
    
    }
    
     let transporter = nodemailer.createTransport(config)
    
    
    const mailGenerator = new MailGen({
      theme: 'default',
      product: {
        name: '1Zero1',
        link: process.env.email
    
      },
    })
    
    
    let response = {
      body: {                //here we are writting everything in html tag and it reflects same as it is in original html
        name: pname,
        intro: `Verify By Clicking`,
        action: {
          instructions: 'Please click the button below to reset your password',
          button: {
            color: '#33b5e5',
            text: 'Click here to verify',
            link: `http://localhost:3200/Verified?token=${token}`
          },
        outro:"Looking Foward To do More Buisness"
      },
    }
    }
    
    
    let mail = mailGenerator.generate(response)
    
    
    
    let message = {
      from: process.env.email,
      to: reciever,
      subject: 'Very Your Account',
      html:mail
    };
    
    
    
    transporter.sendMail(message, function(error, info){                                //this will also work
      if (error){
        console.log(error);
        res.json({msg:"Error sending email"})
      }else{
        console.log('Email sent: ' + info.response);
        let result = data.save()
       res.status(201).json({msg:"Verify Your Email To Login,Email Sent Successfully"})
      }
    });
    }
  else{
      res.json({msg:"The is Some Error during Registering You"})
    }
  }else{
    res.json({msg:"Email Already Exists"})
  }
    }else{
    res.json({msg:"Provide A Valid Email"})
    }
     }else{
    res.json({msg:"Provide Name With length greater than 3"})
     }
    }
    )


//email verification
     app.get("/Verified",async(req,res)=>{
          let token = req.query.token
        let user =await firstscheme.findOne({token:token})
        if(user){
          user.isVerified="true"
          user.token="null"
          let result = await user.save()
          console.log(result)
          res.redirect("http://localhost:3000/Login")
        }
        else{
          res.json({msg:"The user must have a registration token"})
        }
     })


  //login user
  app.post("/loginuser",async(req,res)=>{
        let {email,password} = req.body
        let user =await firstscheme.findOne({email:email})
        if(user){
        if(user.isVerified==="true"){
        let token = jwt.sign({userId:user._id,role:user.role},process.env.SECRET_KEY,{
          expiresIn: '1h',
          algorithm: 'HS256'
        });
        let hashPassword = await bcrypt.compare(password,user.password);
        if(hashPassword)
          {
            res.json({msg:"successfully Login",
            token,
            whatrole:user.role
          })
          console.log("successfully Login")
          }
          else
          {
            res.json({msg:"invalid email or password"})
            console.log("invalid email or password")
          }
        }
        else{
        res.json({msg:"your email is not verified"});
        console.log("your email is not verified")

        }
      }else{
        res.json({msg:"you are not a register user"});
        console.log("you are not a register user")
      }
     
       });
   
       

       //Passwor created
       let codeToVerify =  process.env.codeToVerify

       function createPassword() {
        codeToVerify = Math.floor(Math.random()*696263);
        console.log("Password created:", codeToVerify);
        setTimeout(() => {
            codeToVerify = null;
            console.log("Password expired.");
        }, 60000);
    }
       
       //Forgot Password
       app.post("/Forgotuser",async(req,res)=>{
         let {email} = req.body;
         let user = await firstscheme.findOne({email:email});
         if(user){
           if(user.isVerified==="true"){
           let reciever = user.email
          //  codeToVerify = Math.floor(Math.random()*696263)
          //  console.log(codeToVerify)
          createPassword()

            
           let config = {
             service: 'gmail',
             auth: {
               user: process.env.email,
               pass: process.env.EMAIL_PASSWORD
         }
       
       }
       
        let transporter = nodemailer.createTransport(config)
       
       
       const mailGenerator = new MailGen({
         theme: 'default',
         product: {
           name: '1Zero1',
           link: process.env.email
       
         },
       })
       
       
       let response = {
         body: {                //here we are writting everything in html tag and it reflects same as it is in original html
           name: user.pname,
           intro: `<h1>your code is ${codeToVerify}</h1>`,
           action: {
             instructions: 'The Code Will Remain Valid For Just 1 minute',
             button: {
               color: '#33b5e5',
               text: 'Click here to verify',
               link: `http://localhost:3000/codeVerify/${user._id}`,
             },
           outro:"Looking Foward To do More Buisness"
         },
       }
       }
       
       
       let mail = mailGenerator.generate(response)
       
       
       
       let message = {
         from: process.env.email,
         to: reciever,
         subject: 'Reset Password',
         html:mail
       };
       
       
       
       transporter.sendMail(message, function(error, info){                                //this will also work
         if (error) {
           console.log(error);
         } else {
           console.log('Email sent: ' + info.response);
           res.status(201).json({msg:"Email Sent Successfully"})
         }
       });
         }else{
       res.status(201).json({msg:"Email Not Verfied"})
       }
       }else
         {
           res.json({msg:"you are not a registered user"});
         }
         
       })
   
       //password verify
       app.post("/codeVerify",async(req,res)=>{
          let {code} = req.body;
          // console.log(code);
          // console.log(codeToVerify);
            if(codeToVerify==code)
          {
            res.json({msg:"Password Matched"});
            console.log("success")
            // codeToVerify = Math.floor(Math.random()*696263);
            // console.log("success",codeToVerify)
          }else if(codeToVerify===process.env.codeToVerify){
            res.json({msg:"Password Not Created"})
         }
          else if(codeToVerify===null){
             res.json({msg:"Password Expired"})
          }
          else
          {
            res.json({msg:"code does not matced,Resend Again or check code again"});
            console.log("failure")
            // codeToVerify = Math.floor(Math.random()*696263);
            // console.log("failure",codeToVerify)    
          }
        })
       
       
       //reset password
       app.put("/reset/:id",async(req,res)=>{
        const password = req.body.password;
        const hashPassword = await bcrypt.hash(password, 10)
        const cpassword = hashPassword;
         try{
             let result = await firstscheme.updateOne({_id:req.params.id},{
             $set:{
             password:hashPassword,
             cpassword:cpassword     
             }
             })     //whenever there is a image we will write it as it is
          
         //  let response = await result.save();    //ther is o need to save it cause set is doing the same thing
         //  res.json(response);
          res.json({msg:"Password  Is Updated"});
          console.log(result);
         }
         catch(e){
          console.log(e)
         }
       })
       
     
       

  // //to get current user midddleware
  // const auth = (req,res,next)=>{
    
  //   // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
  //     // the below code comde here
  //   // }

  //   let token = req.headers['authorization'];
  //   // const { authorization } = req.headers
  //   // if (!authorization) {
  //   //   return res.status(401).json({error: 'Authorization token required'})
  //   // }
  //   // const token = authorization.split(' ')[1]

  //   let {userId} = jwt.verify(token,process.env.SECRET_KEY);
  //   // console.log(jwt.verify(token,process.env.SECRET_KEY));
  //   // console.log(userId);
  //   // req.user = await userSchema.findOne({ _id:userId }).select('_id')

  //   req.user = userId;
  //   next();
  // }

  
// to add current user activity
// app.post("/addactivity",auth,upload.single("image"),async(req,res)=>{
//   console.log(req.user);
//   let data = new activityscheme({
//     pname : req.body.pname,
//     description : req.body.description,
//     price:req.body.price,
//     image:req.file.filename,  
//     colors:req.body.colors,
//     category:req.body.category,
//     userId:req.user,
//   })
//    console.log("The Data Added To The Db Is "+data)
//   let result = await data.save()
//   res.send(result)
// })


// to show current user activity
// app.get("/showactivity",auth,async(req,res)=>{
//   let id = req.user
//   console.log(id);
//   let data = await activityscheme.find({userId:id})
//    console.log("The Data in DB IS "+data)
//    res.send(data);
// })



// to update  current user activity
// app.get("/Updateactivity/:id",async(req,res)=>{
//   let result = await activityscheme.findOne({_id:req.params.id})
//   console.log(result)
//   if(result){
//     res.send(result)
//   }else{
//     res.json({msg:"Data Could Not Be Found"})
//   }
//  })

// app.put("/Updateactivity/:id",upload.single("image"),async(req,res)=>{
//   try{
//       let result = await activityscheme.updateOne({_id:req.params.id},{
//       $set:{
//       pname : req.body.pname,
//       description : req.body.description,
//       price:req.body.price,
//       image:req.file.filename,  
//       colors:req.body.colors,
//       category:req.body.category,
//       }
//       })        
//    res.json(result);
//   }
//   catch(e){
//    console.log(e)
//   }
// })

// to delete current user activity
// app.delete("/Removeactivity/:id",async(req,res)=>{
//   let result = await activityscheme.deleteOne({_id:req.params.id})
//   if(res){
//     res.send(result)
//   }else{
//     res.send({"msg":"The Data Could ot Be Deleted"})
//   }
 
// })

//to show All Users Data
// app.get("/AlluserActivity",async(req,res)=>{
//   let result = await activityscheme.find()
//   console.log(result)
//   if(result){
//     res.send(result)
//   }else{
//     res.send({"msg":"Data Could Not Be Found"})
//   }
//  })


  app.listen(3200,()=>{
    console.log("The Server Is Listening At The Port http://localhost:"+3200)
  })

