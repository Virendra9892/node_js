var express = require('express');
var router = express.Router();
const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")

/* GET author listing. */
router.post('/registerAuthor',authorController.registerAuthor);
router.post("/loginAuthor",authorController.loginAuthor);
router.post("/logoutUser",authorController.logoutUser)
router.get("/getAllAuthor",authorController.getAllAuthor)


// get blog listing

router.post("/registerBlog",blogController.registerBlog)
router.get("/getAllblog",blogController.getAllBlogs)
// router.post("/logoutUser",authorController.logoutUser)

module.exports = router;
