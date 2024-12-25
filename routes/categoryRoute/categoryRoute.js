const express = require("express");
const router = express.Router();

// Create a new category
router.post('/', (req, res) => {
    res.json({message: "create a new category"});
});

// Get all categories
router.get('/', (req, res) => {
    console.log("Categories route hit!");
    res.json({message: "get all categories"});
});

// Get a specific category by ID
router.get('/:categoryId', (req, res) => {
    res.json({message: "get a specific category"});
});

// Delete a specific category by ID
router.delete('/:categoryId', (req, res) => {
    res.json({message: "delete a specific category"});
});

module.exports = router;
