const {
    createComment, editComment, deleteComment,
} = require("../../controllers/commentController")
const protectRoute = require("../../middlewares/authMiddleware")
const express = require("express");
const commentRouter = express.Router();

/**
 * @swagger
 * /comments/{postId}:
 *   post:
 *     summary: Create a comment on a post
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post to comment on
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '400':
 *         description: Bad request
 */
commentRouter.post('/:postId', protectRoute, createComment);


commentRouter.get('/:postId', (req, res) => {
    res.json({message: "get all comments for a post"});
});

// Get a specific comment for a post
commentRouter.get('/:postId/:commentId', (req, res) => {
    res.json({message: "get specific comment for a post"});
});

/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     summary: Edit an existing comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the comment to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       '200':
 *         description: Comment updated successfully
 *       '400':
 *         description: Bad request
 */
commentRouter.put('/:postId/:commentId', protectRoute, editComment);

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Comment deleted successfully
 *       '400':
 *         description: Bad request
 */
commentRouter.delete('/:postId/:commentId', protectRoute, deleteComment);

module.exports = commentRouter;
