let express = require("express")
let router = express.Router();
let multer = require("multer")


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


// app.get("/addproducthome",
let adminController = require("../controllers/admin.controller")
let {isAdmin} = require("../middleware/isAdmin")
let {auth} = require("../middleware/auth")





router.post("/addproduct",auth,isAdmin,upload.single("image"),adminController.addProduct)
router.get("/Updatecard/:id",auth,isAdmin,adminController.updateProduct)
router.put("/Updatecard/:id",auth,isAdmin,upload.single("image"),adminController.updateProductFinaly)
router.delete("/Removecard/:id",auth,isAdmin,adminController.deleteProduct)
router.delete("/deletemultiple",auth,isAdmin,adminController.multipleDeleteProduct)
router.delete("/deleteall",auth,isAdmin,adminController.allproductsDelete)


module.exports = router




// app.post("/addproduct"