var express = require('express');
var router = express.Router();
const userController = require("../controller/userController");
const catchVald = require("../middleware/catchVald");
const userVald = require("../validation/userValidation");
const taskController = require("../controller/taskController")

/* GET users listing. */
router.post('/register',userVald,catchVald,userController.registerUser);
router.post("/login",userController.loginUser);
router.get("/getUser",userController.getUser)



// GET tasks listing

router.post("/registerTask",taskController.registerTask)
module.exports = router;
