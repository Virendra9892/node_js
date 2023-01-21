const db = require("../models")
const task = db.task;



// exports.registerTask = async(data)=>{
//     let exist = await task.findOne({where:{taskName:data.taskName}});
//     if(exist){
//         return ({status:403,sucess:false,message:"task already exist"})
//     }
//     let result = await task.create({
//         taskName:data.taskName
//     })
// }