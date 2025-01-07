const {
    createComment, editComment, deleteComment,
} = require("../../controllers/commentController")
const protectRoute = require("../../middlewares/authMiddleware")
const express = require("express");
const commentRouter = express.Router();

// Create a new comment for a specific post
commentRouter.post('/:postId', protectRoute, createComment);

// Get all comments for a specific post
commentRouter.get('/:postId', (req, res) => {
    res.json({message: "get all comments for a post"});
});

// Get a specific comment for a post
commentRouter.get('/:postId/:commentId', (req, res) => {
    res.json({message: "get specific comment for a post"});
});

// Update a specific comment for a post
commentRouter.put('/:postId/:commentId', protectRoute, editComment);

// Delete a specific comment for a post
commentRouter.delete('/:postId/:commentId', protectRoute, deleteComment);

module.exports = commentRouter;
