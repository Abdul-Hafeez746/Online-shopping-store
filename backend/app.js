  let express = require("express")
  const firstscheme = require("./models/userRegister")
  const jwt = require("jsonwebtoken");
  let nodemailer = require("nodemailer")
  let MailGen = require("mailgen")
  let mongoDB = require("./database/connection")
  let cors = require("cors")
  let app = express()
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use("/uploads",express.static('./uploads'))
  app.use(cors({
    origin: '*'
  }))
  require("dotenv").config()
  let mrgn= require("morgan")
  var validator = require('validator');
  const start = require("./userDB");
  const Begin = require("./cardsDB")
  let userRouter = require("./router/user.index")
  let adminRouter = require("./router/admin.index")
  let bcrypt = require("bcrypt")

//log request
// app.use(mrgn("tiny"))
app.use(mrgn("dev"))



// Database Connected
   mongoDB()

   
// These are just files having api. ijust uncomment them and restart my 
// server it automatically add these two apis into local mongodb  and then i comment hem back

//Fake User data API added to db       
  //  start()
//Fake cards data API added to db
  //  Begin()



  app.use("/user",userRouter)
  app.use("/admin",adminRouter)
  
  


  //Login/Logout Complete Module


  //For Registration
  app.post("/register",async(req,res)=>{
    let {pname,number,email,password,cpassword} = req.body
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password,salt);
    let data = new firstscheme({
      pname,
      number,
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
    data.signupSource="loginByOwnJwtModule"
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
          expiresIn: '1m',
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
  
  //login user socially
  app.post('/loginuserSocialy', async (req, res) => {
    try {
      console.log('The data coming in the request body:', req.body);
  
      const { data } = req.body;
   
      let email = data.email

      const existingUser = await firstscheme.findOne({ email });

      if(existingUser){
        // if(existingUser.signupSource=="google"){
           // Generate JWT token
         const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY, {
          expiresIn: '1m',
          algorithm: 'HS256',
        });

          res.json({
            msg: 'This Email Already exits with some other source',
            token,
            whatrole: existingUser.role,
          });
        // }else{
        //   res.json({error:"May be you registered with some other source"})
        // }
      }else{
        // Create a new user document
        const data2 = new firstscheme({
          pname: data.name,
          number: 12454,
          email,
          password: 'nill',
          cpassword: 'nill',
        });
  
        // Generate JWT token
        const token = jwt.sign({ userId: data2._id }, process.env.SECRET_KEY, process.env.OPTIONS, {
          expiresIn: '1h',
          algorithm: 'HS256',
        });
  
        data2.isVerified = data.email_verified;
        data2.token = "null";
        data2.role = 'user';
        data2.signupSource = data.provider;
  
        console.log('The data added to the database:', data2);
  
        // Save the new user to the database
        const result = await data2.save();
  
        if (result) {
          res.json({
            msg: 'Successfully logged in',
            token,
            whatrole: data2.role,
          });
        }
      }
    } catch (error) {
      console.error('An error occurred while processing the login request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
//   app.post("/loginuserSocialy",async(req,res)=>{
//     console.log("the data coming in body",req.body)

//     let {provider,sub,name,email,email_verified,picture} = req.body
//     let data = new firstscheme({
//       pname:name,
//       number:12454,
//       email,
//       password:"nill",
//       cpassword:"nill"
//     })
//     const existingUser = await firstscheme.findOne({ email });
//     if(!existingUser){
//     let token = jwt.sign({userId:data._id},process.env.SECRET_KEY,process.env.OPTIONS,{
//       expiresIn: '1h',
//       algorithm: 'HS256'
//     });
//     data.isVerified="true"
//     data.token="null"
//     data.role="user"
//     data.signupSource=provider
//     console.log("The Data Added To The Db Is "+data)
//     let result = await data.save()
//     if(result){
//       res.json({msg:"successfully Login",
//       token,
//       whatrole:user.role
//     })
//     }
//     }else{
//     res.json({msg:"This Email Is already Registered"})
//     }
// }); 

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
          }else if(codeToVerify===process.env.CODE_TO_VERIFY){
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

  

   //Forgot Password Number
   app.post("/Forgotuserbynumber",async(req,res)=>{
    let {number} = req.body;
    if(!number){
     return res.json({msg:"Please Enter Some Number First"})
    }
    let user = await firstscheme.findOne({number:number});
    if(user){
      if(user.isVerified==="true"){
     createPassword()
     res.json({msg:"OTP through Message Sending...",userId: user._id})
    }else{
      return res.status(201).json({msg:"Your Email Not Verfied"})
  }
  }else
    {
      return res.json({msg:"The Number is Not Registered Yet"});
    }
    
})     


  app.listen(3200,()=>{
    console.log("The Server Is Listening At The Port http://localhost:"+3200)
  })

