const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost/projectdb",{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("no Error at mongodb connection");
    }
    else{
        console.log("Error Occur at mongodb",err)
    }
});

const ProductSchema=new mongoose.Schema({
    id:String,
    Description:String,
    Price:Number,
    company:String,
    availablity:String,
    catagary:String,
    subcatagary:String,
    avgSales:Object,
    pictime:String,
    profit:Number,
    loses:Number,
    type:Object
})

const EmployeeSchema=new mongoose.Schema({
    Emp_Id:String,
    Name:String,
    age:Number,
    Date_of_joing:String,
    Salary:Number,
    Address:String,
    phone:Number,
    Image:String,
    Performance:{
        week1:Array,
        week2:Array,
        week3:Array,
        week4:Array,
        week5:Array,
    },
    Password:String

})

const UserSchema=new mongoose.Schema({
    User_ID:String,
    Name:String,
    age:Number,
    Date_of_joing:String,
    Address:String,
    phone:Number,
    Image:String,
    userDetail:Array,
    userPattern:Object,
    Password:String

})

const CompanySchema=new mongoose.Schema({
    Company_Id:String,
    Name:String,
    Order_day:String,
    Supply_day:String,
    Products:Array,
    other:Object
})

const BillingSchema=new mongoose.Schema({
    bill_id:String,
    Dateofbill:String,
    
    timeofbill:String,
    Amount:Number,
    status:String,
    Product:Array,

})

const Employee=mongoose.model("Employee",EmployeeSchema);
const Product=mongoose.model("Product",ProductSchema);
const User=mongoose.model("User",UserSchema);
const Company=mongoose.model("Company",CompanySchema);
const Billing=mongoose.model("Billing",BillingSchema);





module.exports={Employee,Product,User,Company,Billing};