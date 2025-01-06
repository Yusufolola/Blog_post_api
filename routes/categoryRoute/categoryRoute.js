const express = require("express");
const protectRoute = require("../../middlewares/authMiddleware");
const categoryRouter = express.Router();

const{ createCategory,getAllCategories,getSingleCategory,deleteCategory,} = require("../../controllers/categoryController")


// Create a new category
categoryRouter.post('/', protectRoute, createCategory);

// Get all categories
categoryRouter.get('/', getAllCategories);

// Get a specific category by ID
categoryRouter.get('/:categoryId', getSingleCategory);

// Delete a specific category by ID
categoryRouter.delete('/:categoryId', protectRoute, deleteCategory);

module.exports = categoryRouter;
