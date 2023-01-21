const db = require("../models/index");
const user = db.user;
const fs = require('fs');
// const csv = require('fast-csv');
const csv2json = require("csv2json")
// const csvFile = require("../public/javascript")

exports.registerUser = async(req,res,next)=>{
    try{
        // let body = req.body;
        // let result = await user.create({
        //     userName:body.userName,
        //     email:body.email,
        //     password:body.password
        // });
        // if(result){
        //     return res.send(result)
        // }
    

    
     
   let data =  fs.createReadStream('C:/Users/Nimap/Desktop/Csvfile.js/public/javascript/1673960123458_annual-enterprise-survey-2021-financial-year-provisional-csv.csv')
      .pipe(csv2json({
        // Defaults to comma.
        separator: ';'
      }))
      .pipe(fs.createWriteStream('data1.json'));


    //  let result = await user.bulkCreate(data);
     console.log(data);
        
      // res.send(result)

    }
    catch(error){
        console.log(error);
    }
}