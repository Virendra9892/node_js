// const author = require("../models/author");
// const { body } = require("express-validator");
const db = require("../models/index")
const blogs = db.blogs;
const author = db.author;

exports.registerBlogs = async (data) => {
    let auther = await author.findOne({ where: { id: data.authorId } })
    // return auther
    console.log("auther = ",auther);
    if (!auther) {
        return ({status:404,sucess:false,message:"Author doesn't exist"});
    }
    let exist = await blogs.findOne({ where: { body: data.body } })
    if (exist) {
        return ({ status: 403, sucess: false, message: "blogs already registered." })

    }
    let result = await blogs.create({
        title: data.title,
        body: data.body,
        authorId: data.authorId,
        tags: data.tags,
        category: data.category,
        subCategory: data.subCategory,
    })
    if (result) {
        return ({ status: 201, sucess: true, message: "blogs registerd sucessfully", data: result })
    }
}

exports.getAllBlogs = async () => {
    let data = await blogs.findAll({
        include: {
            model: author,
            as:author,
            attributes: ["fname"]
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    if (!data) {
        return ({ status: 404, sucess: false, message: "Blogs are not found" })
    }
    else {

        return ({ status: 200, sucess: true, message: "Blogs found sucessfully", result: data })
    }
}