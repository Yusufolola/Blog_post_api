const express = require("express");
const protectRoute = require("../../middlewares/authMiddleware")
const {
    deletePost, editPost, createPost, getPostAuthor, getPostCategory,getSinglePost, getPosts
} = require("../../controllers/postController")
const router = express.Router();




router.post('/', protectRoute, createPost)
router.get('/',  getPosts)
router.get('/:postId', getSinglePost)
router.put('/:postId',protectRoute, editPost)
router.delete('/:postId',protectRoute, deletePost)
router.get('/categories/:category', getPostCategory)
router.get('/users/:userId', getPostAuthor)
//router.get('/search', searchPost)
//router.post('/:postId/comments')

module.exports = router;