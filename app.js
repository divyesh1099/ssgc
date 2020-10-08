var express=require("express"),
    methodOverride=require("method-override"),
    mongoose=require("mongoose"),
    bodyParser=require("body-parser");
    Product=require("./models/product");
var app=express();
var myport=process.env.PORT || 3000;
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/ssgc",{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true});
app.set("view engine", "ejs");
//////////////////////////////////////////////////////
//ROUTES
var landingpageRoute=require("./routes/home"),
    productRoute   = require("./routes/products"),
    typeRoute      = require("./routes/types");
///////////////////////////////////////////////////////
//Landing page route
app.use(landingpageRoute);
//Type route
app.use(typeRoute);
//Product route
app.use(productRoute);
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
app.listen(myport, process.env.IP, (req,res)=>{
    console.log("SERVER CONNECTED");
});