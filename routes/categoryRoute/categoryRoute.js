const express = require("express");
const protectRoute = require("../../middlewares/authMiddleware");
const categoryRouter = express.Router();

const{ createCategory,getAllCategories,getSingleCategory,deleteCategory,} = require("../../controllers/categoryController")


/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '201':
 *         description: Category created successfully
 *       '400':
 *         description: Bad request
 */
categoryRouter.post('/', protectRoute, createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       '400':
 *         description: Bad request
 */
categoryRouter.get('/', getAllCategories);

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Get a single category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '400':
 *         description: Bad request
 */
categoryRouter.get('/:categoryId', getSingleCategory);

/**
 * @swagger
 * /categories/{categoryId}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *       '400':
 *         description: Bad request
 */
categoryRouter.delete('/:categoryId', protectRoute, deleteCategory);

module.exports = categoryRouter;
