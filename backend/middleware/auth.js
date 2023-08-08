const jwt = require("jsonwebtoken");
  //to get current user midddleware
  const auth = (req,res,next)=>{
    
    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      // the below code comde here
    // }
   
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token is missing" });
    }
    // const { authorization } = req.headers
    // if (!authorization) {
    //   return res.status(401).json({error: 'Authorization token required'})
    // }
    // const token = authorization.split(' ')[1]


    try{
    let {userId} = jwt.verify(token,process.env.SECRET_KEY,{
      ignoreExpiration: false 
    });

    // let decode = jwt.verify(token,process.env.SECRET_KEY);
    // let userId = decode.userId

    // console.log(jwt.verify(token,process.env.SECRET_KEY));
    // console.log(userId);
    // req.user = await userSchema.findOne({ _id:userId }).select('_id')

    req.user = userId;
    next();
    }catch(error){
        return res.status(401).json({ msg: error.message });
    }
  }
  

module.exports = {auth}

