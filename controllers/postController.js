const Post = require("../models/Post/Post.js")
const User = require("../models/User/User.js")
const HttpError = require("../models/errorModel.js")
// controls all post routes


const createPost = async (req, res, next) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category ) {
        return next(new HttpError("All fields are required", 400));
    }
    try {
        const author = await User.findById(req.user.id);
        if (!author) {
            return next(new HttpError("author not found", 404));
        }
        const newPost = await Post.create({
            title,
            description,
            author: author._id,
            category,
        })
        
        author.posts.push(newPost._id); 
        author.postCount += 1; 
        await author.save(); 

        res.status(201).json({
            message: "Post created successfully and added to user's posts",
            post: newPost,
        });
    } catch (err) {
        return next(new HttpError("Failed to create post, try again later", 500));
    }
};




const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.json({
            status: "success",
            info: posts
        })
    } catch (error) {
        
    }res.json(error.message)
};



//const getSinglePost = async (req, res, next) => {
  //  res.json("get a single post")
//}


//const getPostCategory = async (req, res, next) => {
//    res.json("get post author")
//}


//const getPostAuthor = async (req, res, next) => {
//    res.json("get post author")
//}


const editPost = async (req, res, next) => {
    const { title, description , category} = req.body
    try {
        const postToDelete = await Post.findById(req.params.id);
        if (post.user.toString() !== req.user.id.toString()) {
            return next(HttpError("unauthorized", 403));
        }
        await Post.findByIdAndUpdate(req.params.id, {
            title,
            description,
            category,
        }, {
            new: true
        });
        res.json({
            status: "success",
            info: "post updated successfully",
        })
    } catch (error) {
        res.json(error.message);
    }
}


const deletePost = async (req, res, next) => {
    try {
        const postToDelete = await Post.findById(req.params.id);
        if (post.user.toString() !== req.user.id.toString()) {
            return next(HttpError("unauthorized", 403));
        }
        await Post.findByIdAndDelete(req.params.id);
        res.json({
            status: "success",
            info: "post deleted successfully",
        })
    } catch (error) {
        res.json(error.message);
    }
}


module.exports = {
    deletePost, editPost, createPost, getAllPosts
}