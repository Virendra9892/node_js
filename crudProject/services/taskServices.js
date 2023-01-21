const db = require("../models/index");
const task = db.task;

exports.registerTask = async(data)=>{
    let exist = await task.findOne({where:{taskName:data.taskName}});
    if(exist){
        return ({status:403,sucess:false,message:"Task already exist."});
    }
    let result = await task.create({
        taskName:data.taskName,
        taskType:data.taskType,
        userId:data.userId
    });

    if(result){
        return ({status:200,sucess:true,message:"Task register sucessfully",result:result})
    }
}

