const express = require("express");

const router = express.Router();

// Get all users
router.get('/', (req, res) => {
    res.json({message: "hello"});
});

// Get a single user by ID
router.get('/:userid', (req, res) => {
    res.json({message: "hello single person"});
});

// Register a user
router.post('/register', (req, res) => {
    res.json({message: "hello you are registered"});
});

// Login a user
router.post('/login', (req, res) => {
    res.json({message: "hello you are logged in"});
});

// Logout a user
router.post('/logout', (req, res) => {
    res.json({message: "logout"});
});

// Update a user by ID
router.put('/:userid', (req, res) => {
    res.json({message: "updated"});
});

// Delete a user by ID
router.delete('/:userid', (req, res) => {
    res.json({message: "deleted"});
});

// Change a user's role by ID
router.put('/:userid/role', (req, res) => {
    res.json({message: "role changed"});
});

module.exports = router;
