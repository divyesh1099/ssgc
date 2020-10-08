var express         = require("express"),
    router          = express.Router(),
    Product         = require("../models/product"),
    Type            = require("../models/type"),
    upload          = require("../middleware/upload");
///////////////////////////////////////////////////////////////////////

//All PRODUCTS
router.get("/product/all",(req,res)=>{
    Type.find().populate("products").exec((err,type)=>{
        if(err){
            console.log("Type not found for creating a new product");
            console.log(err);
        }
        else{
            Product.find({},(err,product)=>{
                if(err){
                    console.log("ALL PRODUCTS ROUTE");
                    console.log(err);
                }
                else{
                    if(product.length==0){
                        console.log("NO PRODUCT");
                        res.redirect("/");
                    }
                    else{
                        res.render("products/productall",{
                            type:type,
                            product:product,
                        });
                    }                    
                }
            });
        }
    });
});
//NEW PRODUCT
router.get("/type/:id/product/new",(req,res)=>{
    Type.findById(req.params.id,(err,type)=>{
        if(err){
            console.log("Type not found for creating a new product");
            console.log(err);
        }
        else{
            res.render("products/new",{
                type:type,
            });
        }
    });
});
//ONE PRODUCT
router.get("/type/:id/product/:product_id",(req,res)=>{
    Type.find().populate("products").exec((err,type)=>{
        if(err){
            console.log("TYPE NOT FOUND IN ONE PRODUCT ROUTE");
            console.log(err);
        }
        else{
            Product.findById(req.params.product_id,(err,product)=>{
                if(err){
                    console.log("ONE PRODUCT ROUTE NOT FOUND ERROR");
                    console.log(err);
                }
                else{
                    res.render("products/product",{
                        type:type,
                        product:product
                    });
                }
            });
        }
    });
});
//POST PRODUCT
router.post("/type/:id/product", (req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log("UPLOAD ERROR "+err);
        }
        else{
            if(req.files==undefined){
            res.redirect("/");
            console.log("NO FILE");
            }
            else{
                console.log("UPLOADED FILES");
            }
        } 
    });
    Type.findById(req.params.id,(err,type)=>{
        if(err){
            console.log("Post product type not found");
            console.log(err);
        }
        else{
            Product.create(req.body.product,(err, product)=>{
                if(err){
                    console.log("PRODUCT TYPE NOT FOUND ERROR");
                    console.log(err);
                }
                else{
                    product.save();
                    type.product.push(product);
                    type.save();
                    res.redirect("/");                    
                }
            });
        }
    });
});
//EDIT PRODUCT
router.get("/type/:id/product/:product_id/edit",(req,res)=>{
    Type.findById(req.params.id,(err,type)=>{
        if(err){
            console.log("EDIT PRODUCT TYPE NOTE FOUND ERROR");
            console.log(err);
        }
        else{
            Product.findById(req.params.product_id,(err,product)=>{
                if(err){
                    console.log("EDIT PRODUCT NOT FOUND ERROR");
                    console.log(err);
                }
                 else{
                    res.render("products/edit",{
                        type:type,
                        product:product
                    });
                }
            });
        }
    });
});
//UPDATE PRODUCT 
router.put("/type/:id/product/:product_id",(req,res)=>{
    Type.findById(req.params.id,(err,type)=>{
        if(err){
            console.log("EDIT PRODUCT TYPE NOTE FOUND ERROR");
            console.log(err);
        }
        else{
            Product.findByIdAndUpdate(req.params.product_id,req.body.product,(err,product)=>{
                if(err){
                    console.log("EDIT PRODUCT NOT FOUND ERROR");
                    console.log(err);
                }
                else{
                    console.log("UPDATED THE PRODUCT");
                    res.redirect("/");
                }
            });
        }
    });
});
//DESTROY PRODUCT
router.delete("/type/:id/product/:product_id",(req,res)=>{
    Product.findByIdAndRemove(req.params.product_id,(err)=>{
        if(err){
            console.log("DELETE PRODUCT ERROR");
            console.log(err);
        }
        else{
            console.log("DELETED PRODUCT");
            res.redirect("/");
        }
    });
});
//////////////////////////////////////////////////////////////////////
module.exports=router;