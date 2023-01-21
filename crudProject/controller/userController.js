const userServices = require("../services/userServices");

exports.registerUser = async(req,res,next)=>{
  try{
    let body = req.body;
    console.log("body = ",body);
    let result = await userServices.registerUser({
      userName:body.userName,
      email:body.email,
      password:body.password,
      // userId:body.userId
    });
    
    if(result){
      return res.status(result.status).send({sucess:result.sucess,message:result.message,result:result.result});
    }
  }
  catch(error){
    next(error);
  }
}

exports.loginUser = async(req,res,next)=>{
  try{
    let body = req.body;
    let result = await userServices.loginUser({
      email:body.email,
      password:body.password
    });
    if(result){
      return res.status(result.status).send({sucess:result.sucess,message:result.message,token:result.token});
    }
  }
  catch(error){
    next(error);
  }
}

exports.getUser = async(req,res,next)=>{
  try{
     
     let result = await userServices.getALLUser();
     if(result){
      return res.status(result.status).send({sucess:result.sucess,message:result.message,result:result.result});
     }
  }
  catch(error){
    next(error);
  }
}