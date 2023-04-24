const mongoose =require("mongoose")
const Schema=require("./Schema");

mongoose.connect("mongodb://localhost/projectdb",{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("no Error at mongodb connection");
    }
    else{
        console.log("Error Occur at mongodb",err)
    }
});


function saveproduct(obj){
    const product=new Schema.Product(obj);
    product.save().then(()=>{
        console.log("Protuct saved succesfully");
    })
}

function saveEmp(obj){
    const employee=new Schema.Employee(obj);
    employee.save().then(()=>{
        console.log("Employed details saved succesfully");
    })
}

/* {
    "Emp_Id":"String",
    "Name":"String",
    "age":4,
    "Date_of_joing":"String",
    "Salary":560000,
    "Address":"String",
    "phone":6574837485

}
 */
function saveUser(obj){
    const user=new Schema.User(obj);
    if(obj){
    user.save().then(()=>{
        console.log("User saved succesfully")
    })
}
}

/* {
    "User_ID":"String",
    "Name":"String",
    "age":43,
    "Date_of_joing":"2023-04-01",
    "Address":"String",
    "phone":456766,
    "userDetail":[],
    "userPattern":{}

} */

function saveCompany(obj){
    const company=new Schema.Company(obj);
    if(obj){
        company.save().then(()=>{
            console.log("Company detailes saved succesfully")
        })
        
    }
}

/* {
    "Company_Id":"String",
     "Name":"String",
     "Order_day":"String",
     "Supply_day":"String",
     "Products":[],
     "other":{"gmail":"abc@gmail.com","Address":"Karamadai"}
 
 } */

function saveBill(obj){
    const billings=new Schema.Billing(obj);
    console.log("see obj",obj)
    billings.save().then(()=>{
        console.log("bill saved succesfully");
    })
}
/**********************************Get Data****************************************************/




module.exports={saveproduct,saveEmp,saveUser,saveCompany,saveBill};