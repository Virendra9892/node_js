const blogService = require("../services/blogService")


exports.registerBlog = async (req, res, next) => {
    try {
        let value =  req.body;
        // console.log(value);
        let result = await blogService.registerBlogs({
            title: value.title,
            body: value.body,
            authorId: value.authorId,
            tags: value.tags,
            category: value.category,
            subCategory: value.subCategory,
        })
        if(result){
        return res.status(result.status).send({sucess:result.sucess,messgae:result.message,result:result.data})
        }
    }
    catch (error) {
        next(error)
    }
}

exports.getAllBlogs = async(req,res,next)=>{
    try{
       let result = await blogService.getAllBlogs();
       if(result){
        return res.status(result.status).send({sucess:result.sucess,message:result.message,data:result})
       }
    }
    catch(error){
        next(error)
    }
}