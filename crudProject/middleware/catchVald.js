const {validationResult} = require("express-validator");

module.exports = (req,res,next)=>{
    const err = validationResult(req);
    err.isEmpty() ? next():res.status(400).send({sucess:false,message:err.errors[0].msg});
}

// module.exports = (req, res, next) => {
//     const errors = validationResult(req);
//     const errData=[]
//     for(let i=0;i<3;i++){
//         errData.push(errors.errors[i].msg)
//     }
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             message: errData
//         })
//     } else {
//         next();
//     }
// };