// controls all post routes


const createPost = async (req, res, next) => {
    res.json("create post")
}




const getPosts = async (req, res, next) => {
    res.json("get posts")
}



const getSinglePost = async (req, res, next) => {
    res.json("get a single post")
}


const getPostCategory = async (req, res, next) => {
    res.json("get post author")
}


const getPostAuthor = async (req, res, next) => {
    res.json("get post author")
}


const editPost = async (req, res, next) => {
    res.json("edit post")
}


const deletePost = async (req, res, next) => {
    res.json("delete post")
}


module.exports = {
    deletePost, editPost, createPost, getPostAuthor, getPostCategory,getSinglePost, getPosts
}