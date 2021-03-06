var express         = require("express"),
    router          = express.Router(),
    Type            = require("../models/type");
///////////////////////////////////////////////////////////////////////
//NEW TYPE
router.get("/type/new",(req,res)=>{
    Type.find({},(err,type)=>{
        if(err){
            console.log("EDIT TYPE ERROR");
            console.log(err);
        }
        else{
            res.render("types/new",{type:type});
        }
    });
});
//ALL TYPE
router.get("/type/all",(req,res)=>{
    Type.find().populate("product").exec((err,type)=>{
        if(err){
            console.log("ALL TYPE FIND ERROR"+err);
        }
        else{
            res.render("types/typeall",{
                type:type,
                product:type.product
            });
        }
    });    
});
//TYPE
router.get("/type/:id",(req,res)=>{
    Type.findById(req.params.id).populate("product").exec((err, type)=>{
        if(err){
            console.log("TYPE GET ROUTE ERROR");
            console.log(err);
        }
        else{
            res.render("types/type",{
                type:type,
                product:type.product
            });                                
        }
    });            
});
//POST TYPE
router.post("/type", (req,res)=>{
    var type=req.body.type;
    Type.create(type,(err,type)=>{
        if(err){
            res.send("PRODUCT TYPE NOT FOUND ERROR");
            res.send(err);
        }
        else{
            res.redirect("/");
        }
    });
});
//EDIT TYPE
router.get("/type/:id/edit",(req,res)=>{
    Type.findById(req.params.id,(err,type)=>{
        if(err){
            console.log("EDIT TYPE ERROR");
            console.log(err);
        }
        else{
            res.render("types/edit",{type:type});
        }
    });
});
//UPDATE TYPE
router.put("/type/:id",(req,res)=>{
    Type.findByIdAndUpdate(req.params.id,req.body.type,(err,type)=>{
        if(err){
            console.log("TYPE PUT ROUTE ERROR");
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    });
});
//DESTROY TYPE
router.delete("/type/:id",(req,res)=>{
    Type.findById(req.params.id,(err,type)=>{
        if(err){
            console.log("DESTROY TYPE ROUTE ERROR"+err);
        }
        else{
            Product.find({},(err, product)=>{
                if(err){
                    console.log("PRODUCT NOT FOUND");
                }
                else{
                    console.log(product);
                    for(var a=0;a<product.length;a++){
                        Product.findByIdAndRemove(product[a].id,(err)=>{
                            if(err){
                                console.log("DELETED PRODUCT WHILE DELETING TYPE ERROR: "+err);
                            }
                            else{}
                        });
                    }
                }
            });       
        }
        Type.findByIdAndRemove(req.params.id,(err)=>{
            if(err){
                console.log("DELETE TYPE ERROR");
                console.log(err);
            }
            else{
                console.log("DELETED TYPE");
                res.redirect("/");
            }
        });
    });
});
///////////////////////////////////////////////////////////////////////
module.exports=router;