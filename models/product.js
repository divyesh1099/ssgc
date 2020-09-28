var mongoose=require("mongoose");
//PRODUCT SCHEMA
var productSchema=new mongoose.Schema({
    imageOne:String,
    imageTwo:String,
    imageThree:String,
    name:String,
    description:String,
    price:String
});
var Product=mongoose.model("Product",productSchema);
module.exports=Product;