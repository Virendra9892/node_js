const user = require("../models/user");
let userServices = require("../services/userService");


exports.registerUser = async(req,res,next)=>{
    try{
        let body = req.body;
        console.log("body = ",body);
        let result = await userServices.registerUser({
            userName:body.userName,
            email:body.email,
            password:body.password
        });
        // if(body>1){
        //     var result = await userServices.registerUser({
        //         userName:body.userName,
        //         email:body.email,
        //         password:body.password
        //     });
        //     return res.status(result.status).send({sucess:result.sucess,message:result.message,result:result.data});
        // }
        // else{
        //     var result = await userServices.registerUser({
        //         userName:body.userName,
        //         email:body.email,
        //         password:body.password
        //     });
        //     return res.status(result.status).send({sucess:result.sucess,message:result.message,result:result.data});
        // }
        if(result){
            return res.status(result.status).send({sucess:result.sucess,message:result.message,result:result.data});
        }
       
    }
    catch(error){
        next(error);
    }
}

exports.findAllUser = async(req,res,next)=>{
    try{
       let result = await userServices.findAllUser();
       if(result){
        return res.status(result.status).send({sucess:result.sucess,message:result.message,result:result.result})
       }
    }
    catch(error){
        next(error)
    }
}