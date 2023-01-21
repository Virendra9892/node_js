const db = require("../models/index")
const Sequelize = require('sequelize');
const bcrypt = require("bcrypt")
const user = db.user;


exports.registerUser = async(data)=>{
    console.log("data = ",data);
    let exist = await user.findOne({where:{email:data.email}});
    if(exist){
        return ({status:403,sucess:false,message:"user already exist."});
    }
    let salt = await bcrypt.genSalt(10);
    let hashpass =await bcrypt.hash(data.password,salt);
    let result = await user.create({
        userName:data.userName,
        email:data.email,
        password:hashpass
    });
    
    // if(data>1){
    //     var result = await user.bulkCreate({
    //         userName:data.userName,
    //         email:data.email,
    //         password:hashpass
    //     });
    //     return ({status:200,sucess:true,message:"user register sucessfully",data:result.result})
    // }
    // else{
    //     var result = await user.create({
    //         userName:data.userName,
    //         email:data.email,
    //         password:hashpass
    //     });
    //     return ({status:200,sucess:true,message:"user register sucessfully",data:result.result})
    // }
    return ({status:200,sucess:true,message:"user register sucessfully",data:result.result})

}

exports.loginUser = async(data)=>{
    let exist = await user.findOne({email:data.email});
    if(exist){
        return ({status:404,sucess:false,message:"User doesn't exist"})
    }
    let matched = await bcrypt.compare(exist.password,data.password);
    if(!matched){
        return ({status:404,sucess:false,message:"Invalid userName or password"});
    }
    let token = await user.generateToken(
        exist.userName,
        exist.email
    )
    if(token){
        return ({status:200,sucess:true,message:"User logged in sucessfully",token:token.token})
    }
}

exports.findAllUser = async()=>{
    let result = await user.findAll({
       attributes:["id","userName", [Sequelize.fn('COUNT', Sequelize.col("id")), 'count']]
    })
    if(result){
        return ({status:200,sucess:true,message:"user found sucessfully",result:result.result})
    }
}