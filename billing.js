const mongoose =require("mongoose")
const Schema=require("./Schema");


mongoose.connect("mongodb://localhost/projectdb",{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("no Error");
    }
    else{
        console.log("Error Occur",err)
    }
});
const v={
    id:"s1001",
    Description:"Surf exel 10rs pack",
    Price:10,
    company:"Unilever",
    Delor:"v.M.K Agencies",
    availablity:"17packs",
    catagary:"Clouthwash",
    subcatagary:"Soap Powder",
    avgSales:3,
    pictime:"no",
    profit:1.5,
    loses:0
}
const product =new Schema.Product(v);
product.save().then(()=>{
    console.log("prodect saved")
})

