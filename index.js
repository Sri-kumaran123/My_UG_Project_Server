const express=require('express');
const app=express()
const bodyParsder=require('body-parser');
const cors=require("cors");
/*requirments for coding*/
const ans=require('./home')

const funcfiles=require("./mongodbf");
const Schema=require("./Schema");
const { query } = require('express');

console.log(ans)

app.use(bodyParsder.urlencoded({extended:false}))
app.use(bodyParsder.json())
app.use(
    cors({
        origin:"*",
    })
)

app.listen(2000,()=>{
    console.log("Server Start");
    console.log(ans.y);
})


app.get('/messages',(req,res)=>{
    var values;
    Schema.Product.find({},(err,data)=>{
        function fun(x){
            if(x){
                return `Alert for Low stock we have only ${x.availablity} pices of  ${x.Description} `
            }
        
        }
        values=data;
       var y=values.map(x=>{
            console.log(x.availablity);
            if(x.availablity<=3){
              return fun(x);
            } 
            return null;
        })
        console.log("ans",y)
        res.send(y)
    })
   
    console.log("see2",ans)
})

app.post('/addp',(req,res)=>{
    var v=req.body;
    console.log(v);
    res.status(200).send('done');
    funcfiles.saveproduct(v);
})

app.post('/addemp',(req,res)=>{
    var v=req.body;
    var ch;
    console.log(v)
    Schema.Employee.find({Emp_Id:req.body.Emp_Id},(err,data)=>{
        ch=data;
        console.log("i",data)
        
        if(data[0]==undefined){
            funcfiles.saveEmp(v);
            res.status(200).send("Succes")
        }
        else{
            res.send("Failed")
        }
       })
      
    
    
 
})

app.post('/adduser',(req,res)=>{
    var v=req.body;
    console.log(v)
    Schema.User.find({User_ID:req.body.User_ID},(err,data)=>{
        if(data[0]==undefined){
            funcfiles.saveUser(v);
            res.status(200).send("Succes");
        }
        else{
            res.send("Failed")
        }
    })
    
    
})

app.post('/addcompany',(req,res)=>{
    var v=req.body;
    res.status(200).send("Done");
    funcfiles.saveCompany(v);
})

app.post('/addbill',(req,res)=>{
    funcfiles.saveBill(req.body);
    console.log(req.body);
    res.status(200).send("Done")
})

/* *****************************************GET***************************************************************** */

app.get('/getemp',(req,res)=>{
    // res.status(200).send({name:"values",valus:funcfiles.getEmp()})
    // console.log()
   
    if(req.query.Emp_ID){
    Schema.Employee.find({Emp_Id:req.query.Emp_ID},(err,data)=>{
        res.status(200).send(data);
        console.log(data)
       })
       
   }
    
   else{
   Schema.Employee.find({},(err,data)=>{
    res.status(200).send(data);
   })
}
})

app.get('/getuser',(req,res)=>{
    //const Schema=require("./Schema");
    console.log(req.query)
    if(req.query.User_ID){
        Schema.User.find({User_ID:req.query.User_ID},(err,data)=>{
            res.status(200).send(data);
            console.log(data)
           })
           
       }
       else{
       Schema.User.find({},(err,data)=>{
        res.status(200).send(data);
       })}
})
app.get('/getproduct',(req,res)=>{
   // const Schema=require("./Schema");
   console.log(req.query)
   if(!req.query.default){
        if(req.query.id){
            Schema.Product.find({id:req.query.id},(err,data)=>{
                if(!err){
                console.log("getproduct if if")
                res.status(200).send(data);
                }
            })
        }
        else if(req.query.catagary){
            Schema.Product.find({catagary:req.query.catagary},(err,data)=>{
                if(!err){
                console.log("getproduct if else if")
                res.status(200).send(data);
                }
            })
        }
        else{
            Schema.Product.find({Description:req.query.Description},(err,data)=>{
                if(!err){
                console.log("getproduct if else",data)
                res.status(200).send(data);
                }
            })
        }
   }
    else if(req.query.anarray){
        var v=req.query.anarray;
        var s;
        const f=()=>{
            s=v.map(x=>{
            Schema.Product.find({id:x},(err,data)=>{
                return data
            })
            })
        }
            
        f()
                res.status(200).send(s);
                console.log("hi",s);
                console.log("e",v)
    }
    else{
        Schema.Product.find({},(err,data)=>{
         res.status(200).send(data);
        })}
 })

app.get('/getcompany',(req,res)=>{
   // const Schema=require("./Schema");
   
   if(req.query.Company_ID){
    Schema.Company.find({Company_Id:req.query.Company_ID},(err,data)=>{
        res.status(200).send(data);
       })
       console.log("hi")
   }
    else if(req.body.condition){

    }
   else{
   Schema.Company.find({},(err,data)=>{
    res.status(200).send(data);
   })
}
})

app.get('/getbill',(req,res)=>{
    Schema.Billing.find({},(err,data)=>{
        res.status(200).send(data);
        console.log("Bill sended")
    })
})

/*************************************Update*****************************/

app.post('/updateuser',(req,resl)=>{
    const v=req.body;
    console.log(v)
    //const Schema=require("./Schema");
    if(v.phone==undefined){
        Schema.User.updateMany({ User_ID: v.User_ID },{userDetail:v.userDetail}).then(()=>{
            resl.status(200).send("done1")
        })
        
    }
    else if(v.User_ID){
        console.log('hi')
    const res =  Schema.User.updateMany({ User_ID: v.User_ID }, {age : v.age,Name:v.Name,Date_of_joining:v.Date_of_joining,Address:v.Address,phone:v.phone,Image:v.Image,Password:v.Password}).then(()=>{
        console.log("Success");
    })
}
  else{
    Schema.User.find({User_ID:v.User_ID},(err,data)=>{
        resl.status(200).send(data);
    })
}

})

app.post('/updateemp',(req,res)=>{
    const v=req.body;
    console.log(v)
    
    if(v.ch){
        Schema.Employee.findByIdAndUpdate(req.body._id,{Performance:req.body.week},(err,data)=>{
            res.status(200).send(data);
            console.log(data)
           })
    }  
    else{
        console.log("second",v.Emp_Id,v.Date_of_joining)
    const res1 =  Schema.Employee.updateMany({ Emp_Id: v.Emp_Id }, {Image:v.Image,age : v.age,Name:v.Name,Date_of_joing:v.Date_of_joing,Address:v.Address,phone:v.phone,Salary:v.Salary,Password:v.Password}).then(()=>{
        console.log("Success");
    })
}
 

})

app.post('/updatecompany',(req,res)=>{
    const v=req.body;
    console.log(v)
   // const Schema=require("./Schema");
   if(v.Products){
    Schema.Company.findByIdAndUpdate(v._id,{Products:v.Products}).then(()=>{
        console.log("done")
    })
   }
    else{
    const res1 =  Schema.Company.updateMany({ Company_ID: v.Company_ID }, {Name:v.Name,Order_day:v.Order_day,Supply_day:v.Supply_day,Products:v.Products,other:v.other}).then(()=>{
        console.log("Success");
    })
}
  res.send("done")

})


app.post('/updateprodects',(req,res)=>{
    if(req.body.Price){
        Schema.Product.findByIdAndUpdate(req.body._id,{availablity:req.body.availablity,subcatagary:req.body.subcatagary,Description:req.body.Description,company:req.body.company,catagary:req.body.catagary,Price:req.body.Price}).then(res=>{
            console.log("Suuces fully product updated")
        })
    }
    else{
        Schema.Product.findByIdAndUpdate(req.body._id,{availablity:req.body.availablity,avgSales:req.body.avgSales}).then(res=>{
            console.log("Suuces fully product updated")
        })
    }
})
/*******************************delete******************************* */
app.post('/deleteuser',(req,res)=>{
    const v=req.body;
    console.log(v)
   // const Schema=require("./Schema");
    try{
    const res1 =  Schema.User.findByIdAndDelete(v._id).then(()=>{
        console.log("Success");
    })
    res.send("done")
}
catch(e){}
})
app.post('/deleteemp',(req,res)=>{
    const v=req.body;
    console.log(v)
  //  const Schema=require("./Schema");
    try{
    const res1 =  Schema.Employee.findByIdAndDelete(v._id).then(()=>{
        console.log("Success");
    })
    res.send("done")
}
catch(e){}
})
app.post('/deletecompany',(req,res)=>{
    const v=req.body;
    console.log(v)
   // const Schema=require("./Schema");
    try{
    const res1 =  Schema.Company.deleteOne({ Company_ID: v.Company_ID }).then(()=>{
        console.log("Success");
    })
    res.send("done")
}
catch(e){}
})

app.post('/deleteproduct',(req,res)=>{
    
    Schema.Product.findByIdAndDelete(req.body._id).then(()=>{
        res.status(200).send("Deleted")
        console.log("done")
    })
})

