const db = require("../models/index")
const author = db.author;
const blogs = db.blogs
const bcrypt = require("bcrypt");
// const { UPSERT } = require("sequelize/types/query-types");


exports.registerAuthor = async(data)=>{
       let exist = await author.findOne({where:{email:data.email}});
       if(exist){
        return ({status:403,sucess:false,messae:"author already exist"})
       }
       let salt = await bcrypt.genSalt(10);
       let hashpass = await bcrypt.hash(data.password,salt);

       let result = await author.create({
        title:data.title,
        fname:data.fname,
        lname:data.lname,
        email:data.email,
        password:hashpass
       });

       if(result){
        return({status:201,sucess:true,message:"author register sucessfully.",data:result})
       }
}

exports.loginAuthor = async(data)=>{
    let exist = await author.findOne({where:{email:data.email}});
    if(!exist){
        return ({status:404,sucess:false,message:"author doesn't exist"});
    }
    let matched = await bcrypt.compare(data.password,exist.password);
    if(!matched){
        return ({status:404,sucess:false,message:"invalid email or password."})
    }
    let token = await author.generateToken(
        exist.email,
        exist.id
    )
    if(token){
        return ({status:200,sucess:true,message:"author login sucessfully",data:token})
    }
}

exports.logoutUser = async(data)=>{
    let token1 = data.split(" ")[1]
    // console.log("token1 = ",token1);
    let result = await author.destroy(token1)
    if(result){
        return ({status:200,sucess:true,message:"user logout sucessfully."});
    }
}

exports.getAllAuthor = async()=>{
    // let 
    // let exist = await author.findOne({where:{email:data.email}});
    // if(!exist){
    //     return ({status:404,status:false,message:"author doesn't exist"})
    // }
    let result = await author.findAll({
        include:{
            model:blogs,
            as:blog,
            attributes:["title","body","category"]
        },
        attributes:{exclude:["createdAt","updatedAt"]}
    })
    if(result){
        return ({status:200,sucess:true,message:"author found sucessfully",data:result});
    }
}