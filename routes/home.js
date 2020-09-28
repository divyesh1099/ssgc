var express         = require("express"),
    router          = express.Router(),
    Type            = require("../models/type");
///////////////////////////////////////////////////////////////////////
//Landing page route
router.get("/",(req,res)=>{
    Type.find().populate("product").exec((err, type)=>{
        if(err){
            console.log("FIND TYPE ERROR");
            console.log(err);
        }
        else{
                res.render("home",{
                type:type,
            });
        }
    });
});
///////////////////////////////////////////////////////////////////////
module.exports=router;