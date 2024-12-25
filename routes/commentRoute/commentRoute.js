const express = require("express");
const router = express.Router();

// Create a new comment for a specific post
router.post('/:postId', (req, res) => {
    res.json({message: "create a new comment for a post"});
});

// Get all comments for a specific post
router.get('/:postId', (req, res) => {
    res.json({message: "get all comments for a post"});
});

// Get a specific comment for a post
router.get('/:postId/:commentId', (req, res) => {
    res.json({message: "get specific comment for a post"});
});

// Update a specific comment for a post
router.put('/:postId/:commentId', (req, res) => {
    res.json({message: "update specific comment for a post"});
});

// Delete a specific comment for a post
router.delete('/:postId/:commentId', (req, res) => {
    res.json({message: "delete specific comment for a post"});
});

module.exports = router;
