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
router.post("/search",(req,res)=>{
    q=req.body.q; 
    var sql=[];
    var sqlt=[];
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    sq=capitalizeFirstLetter(q);
    Type.find().populate("product").exec((err, type)=>{
        if(err){
            console.log("SEARCH POST ROUTE ERROR"+err);
        }
        else{
            for(var a=0;a<type.length;a++){
                for(var b=0;b<type[a].product.length;b++){
                    if(type[a].product[b].name.startsWith(sq)){
                        sql.push(type[a].product[b]);
                        sqlt.push(type[a].id);
                    }
                    else{
                    }
                }
            }
            res.render("search",{
                type:type,
                product:type.product,
                sql:sql,
                sqlt:sqlt
            });
        }
    });
});
///////////////////////////////////////////////////////////////////////
module.exports=router;