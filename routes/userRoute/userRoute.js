const express = require("express");
const {getAllusers, getUserById, registerUser, loginUser, 
    logoutUser, updateUser,
    deleteUser,
    changeRole} = require("../../controllers/userController")
const router = express.Router();
const protectRoute = require("../../middlewares/authMiddleware")

// Get all users
router.get('/',protectRoute, getAllusers);

// Get a single user by ID
router.get('/:userid', protectRoute, getUserById);

// Register a user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Logout a user
router.post('/logout', protectRoute, logoutUser);

// Update a user by ID
router.put('/:userid', protectRoute, updateUser);

// Delete a user by ID
router.delete('/:userid',protectRoute, deleteUser);

// Change a user's role by ID
//router.put('/:userid/role', protectRoute, changeRole);

module.exports = router;
