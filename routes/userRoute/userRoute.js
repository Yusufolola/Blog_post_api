const express = require("express");
const {getAllusers, getUserById, registerUser, loginUser, 
    logoutUser, updateUser,
    deleteUser,
    changeRole} = require("../../controllers/userController")
const userRouter = express.Router();
const protectRoute = require("../../middlewares/authMiddleware")

// Get all users
userRouter.get('/',protectRoute, getAllusers);

// Get a single user by ID
userRouter.get('/:userid', protectRoute, getUserById);

// Register a user
userRouter.post('/register', registerUser);

// Login a user
userRouter.post('/login', loginUser);

// Logout a user
userRouter.post('/logout', protectRoute, logoutUser);

// Update a user by ID
userRouter.put('/:userid', protectRoute, updateUser);

// Delete a user by ID
userRouter.delete('/:userid',protectRoute, deleteUser);

// Change a user's role by ID
//router.put('/:userid/role', protectRoute, changeRole);

module.exports = userRouter;
