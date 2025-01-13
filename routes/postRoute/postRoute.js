const express = require("express");
const protectRoute = require("../../middlewares/authMiddleware")
const {
    deletePost, editPost, createPost, getAllPosts
} = require("../../controllers/postController")
const postRouter = express.Router();



/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '201':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
postRouter.post('/', protectRoute, createPost)

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     responses:
 *       '200':
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '500':
 *         description: Server error
 */
postRouter.get('/',  getAllPosts)
//postRouter.get('/:postId', getSinglePost)

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Edit a post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Server error
 */
postRouter.put('/:postId',protectRoute, editPost)

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to delete
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Server error
 */
postRouter.delete('/:postId',protectRoute, deletePost)
//postRouter.get('/categories/:category', getPostCategory)
//postRouter.get('/users/:userId', getPostAuthor)
//router.get('/search', searchPost)
//router.post('/:postId/comments')

module.exports = postRouter;