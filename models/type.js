var mongoose=require("mongoose");
///////////////////////////////////////////////
//TYPE SCHEMA
var typeSchema=new mongoose.Schema({
    name:String,
    description:String,
    product:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
        }
    ]
});
var Type=mongoose.model("Type",typeSchema);
///////////////////////////////////////////////
module.exports=Type;