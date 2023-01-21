var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const errorWrap = require("../utils/errorwrapper")
const {userValid }= require("../validation/userValidation")
const catchValidationError = require("../middleware/validationError")
/* GET users listing. */
router.post('/registerUser',errorWrap.wrapper(userController.registerUser));
router.get('/getAllUser',errorWrap.wrapper(userController.findAllUser));

module.exports = router;
