let express = require("express")
let router = express.Router();
let multer = require("multer")

require("dotenv").config()


//For Cards CRUD
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        // let imagepath = path.join(__dirname,"./uploads")
        // cb(null,imagepath)

        cb(null ,"./uploads")
    },
    filename: function(req,file,cb){
        const newfilename = Date.now()+'-'+file.originalname;                                    
        cb(null,newfilename)
    }

})

let typefilter = (req,file,cb) => {
    if(file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" ){
        cb(null,true)
    }else{
        cb(new Error("File size must me leass than 1mb || Supported Formats png,jpg and jpeg"))
    }

}

let maxSize = 1*1024*1024


let upload = multer({
    storage:storage,
    fileFilter:typefilter,
    limits:{fileSize:maxSize}
})







let userController = require("../controllers/user.controller")
let {auth} = require("../middleware/auth")




router.get("/addproducthome",auth,userController.homepageproducts)
router.get("/addproduct",auth,userController.getProducts)
router.post("/addactivity",auth,upload.single("image"),userController.addActivity)
router.get("/showactivity",auth,userController.showActivity)
router.get("/Updateactivity/:id",auth,userController.getUpdateActivity)
router.put("/Updateactivity/:id",auth,upload.single("image"),userController.updateActivity)
router.delete("/Removeactivity/:id",auth,userController.deleteActivity)
router.get("/AlluserActivity",auth,userController.allUsersActivity)

module.exports = router