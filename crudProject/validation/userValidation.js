const { body } = require("express-validator");

module.exports = [

body("userName")
.isLength({min:2,max:10})
.withMessage("User Name must be min 2 char long and max 10 char long.")
.notEmpty()
.withMessage("username should not empty."),

body("email")
.isEmail()
.withMessage("Please enter valid mail")
.notEmpty()
.withMessage("email should not be empty"),

body("password")
.isLength({min:2,max:10})
.withMessage("password length should be min 2 char long and max 10 char long.")
.notEmpty()
.withMessage("Password is required.")

]