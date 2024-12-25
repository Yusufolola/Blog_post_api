const express = require("express");


const router = express.Router();

router.post('/', (req, res) =>
{
    res.json({message:"post created"});
});



router.get('/', (req, res) =>
{
    res.json({message:"get all posts"});
});


router.get('/:postId', (req, res) =>
{
    res.json({message:"get single post"});
});


router.put('/:postId', (req, res) =>
{
    res.json({message:"update a post"});
});

router.delete('/:postId', (req, res) =>
{
    res.json({message:"delete a post"});
});

router.get('/category/:categoryId', (req, res) =>
{
    res.json({message:"get a post by category"});
});

router.get('/author/:userId', (req, res) =>
{
    res.json({message:"get all posts by author"});
});


router.get('/search', (req, res) =>
{
    res.json({message:"search posts by title,content"});
});

router.post('/:postId/comments', (req, res) =>
{
    res.json({message:"comment on a post"});
});

module.exports = router;