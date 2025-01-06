const express = require("express");
const protectRoute = require("../../middlewares/authMiddleware")
const {
    deletePost, editPost, createPost, getPostAuthor, getPostCategory,getSinglePost, getPosts
} = require("../../controllers/postController")
const postRouter = express.Router();




postRouter.post('/', protectRoute, createPost)
postRouter.get('/',  getPosts)
postRouter.get('/:postId', getSinglePost)
postRouter.put('/:postId',protectRoute, editPost)
postRouter.delete('/:postId',protectRoute, deletePost)
postRouter.get('/categories/:category', getPostCategory)
postRouter.get('/users/:userId', getPostAuthor)
//router.get('/search', searchPost)
//router.post('/:postId/comments')

module.exports = postRouter;