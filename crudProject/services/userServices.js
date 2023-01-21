const db = require("../models/index");
const user = db.user;
// const task = db.task
const bcrypt = require("bcrypt");
// const task = require("../models/task");
// const tasktable = db.task

exports.registerUser = async(data)=>{
  // console.log("data = ",data);
  let exist = await user.findOne({where:{email:data.email}});
  if(exist){
    return ({status:403,sucess:false,message:"User Already Exist."});
  }
  let salt = await bcrypt.genSalt(10);
  let hashpass = await bcrypt.hash(data.password,salt);
  // console.log("hash = ",hashpass);
  let result = await user.create({
    userName:data.userName,
    email:data.email, 
    password:hashpass,
    // userId:data.userId
  });
  // console.log("Result= ",result);
  if(result){
    return ({status:201,sucess:true,message:"User register sucessfully",result:result});
  }
}

exports.loginUser = async(data)=>{
  let exist = await user.findOne({where:{email:data.email}});
  if(!exist){
    return ({status:404,sucess:false,message:"user doesn't exist."});
  }
  let matched = await bcrypt.compare(data.password,exist.password);
  console.log("matched = ",matched);
  if(!matched){
    return({status:400,sucess:false,message:"Invalid username or password."});
  }
  let result = await user.generateToken(
    exist.userName,
    exist.email
  );
  if(result){
    return ({status:200,sucess:true,message:"Token Generated Sucessfully.",token:result});
  }
}


exports.getALLUser = async()=>{
  // let exist = await user.findOne({where:{email:data.email}});
  // if(!exist){
  //   return ({status:404,sucess:false,message:"User doesn't exist."})
  // }
  let result = await user.findAll();
  if(result){
    return ({status:200,sucess:true,message:"User Found Sucessfully.",result:result});
  }
}