var multer= require("multer"),
    util=require("util"),
    path= require("path");
//MULTER
var storage=multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req, file, cb)=>{
        cb(null,file.fieldname+" "+Date.now()+path.extname(file.originalname));
    }
});
var upload=multer({
    storage:storage,
    limits:{fileSize:100000000},
    fileFilter:(req, file, cb)=>{
        checkFileType(file, cb);
    }
// }).single("myImage");
}).array("image", 3);
function checkFileType(file, cb){
    //Allowed file types
    var filetypes=/jpeg|jpg|png|gif/;
    //Check Extensions
    var extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mimetype
    var mimetype = filetypes.test(file.mimetype);
    //Check if both Mimetype and Ext Name are true 
    if(extname && mimetype){
        return cb(null, true);
    }
    else{
        cb("ONLY IMAGES UPTO 100MB");
    }
}
var uploadFilesMiddleware = util.promisify(upload);
module.exports=uploadFilesMiddleware;