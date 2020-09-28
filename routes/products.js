var express         = require("express"),
    router          = express.Router(),
    Product         = require("../models/product"),
    Type            = require("../models/type");
///////////////////////////////////////////////////////////////////////
//All PRODUCTS
router.get("/type/:id/product/all",(req,res)=>{
    Type.findById(req.params.id,(err,type)=>{
        if(err){
            console.log("Type not found for creating a new product");
            console.log(err);
        }
        else{
            res.render("products/productall",{type:type});
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
            res.render("products/new",{type:type});
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
///////////////////////////////////////////////////////////////////////
module.exports=router;