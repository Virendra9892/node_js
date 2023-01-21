const {check} = require("express-validator");

exports.userValid = [
    check("userName")
    .notEmpty()
    .withMessage("username must be required")
    .isLength({min:2,max:8})
    .withMessage("username must be min 2 char and max 8 char long"),

    check("email")
    .notEmpty()
    .withMessage("useremail must be required")
    .isEmail()
    .withMessage("please enter valid eamil")
    .isLength({min:2,max:20})
    .withMessage("email must be min 2 char long and max 10 char long")
    .custom((val) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g.test(val))
    .withMessage('Invalid Password'),
    
    check("password")
    .notEmpty()
    .withMessage("password must be required")
    .isLength({min:2,max:12})
    .withMessage("password length must be min 2 char long and max 12 char long ")
   
] 