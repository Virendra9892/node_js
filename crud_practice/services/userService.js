const db = require("../models/index")
const user = db.user;
const task = db.task;



exports.registerUser = async(data)=>{
    let exist = await user.findOne({where:{email:data.email}});
    if(exist){
        return ({status:403,sucess:false,message:"User already exist"});
    }
    let result = await user.create({
        userName:data.userName,
        email:data.email,
        password:data.password
    })
  
    let taskExist = await task.findOne({where:{taskName:data.taskName}});
    
    if(taskExist){
        return ({status:403,sucess:false,message:"Task already exist"});
    }
    let createTask = await task.create({
        taskName:data.taskName,
        taskType:data.taskType
    })
    
    if(result){
        return ({status:200,sucess:true,message:"user register sucessfully",result:result})
    }

    if(createTask){
        return ({status:200,sucess:true,message:"task created sucessfully.",result:createTask});
    }
}

exports.getAllUser = async()=>{
    let result = await user.findAll();
    if(!result){
        return ({status:404,sucess:false,message:"User Doesn't Exist."})
    }
    if(result){
        return ({status:200,sucess:true,message:"User found sucessfully",result:result});
    }
}