const express = require("express");
const {getAllusers, getUserById, registerUser, loginUser, 
    logoutUser, updateUser,
    deleteUser,
    changeRole} = require("../../controllers/userController")
const userRouter = express.Router();
const protectRoute = require("../../middlewares/authMiddleware")



/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 */
userRouter.get('/', getAllusers);

/**
 * @swagger
 * /users/{userid}:
 *   get:
 *     description: Retrieve a user by their unique ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userid
 *         in: path
 *         description: The ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get('/:userid', protectRoute, getUserById);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     description: Register a new user by providing necessary information like name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */
userRouter.post('/register', registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Users
 *     description: Log in a user by providing their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Login successful, returns a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
userRouter.post('/login', loginUser);


/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: User logout
 *     tags:
 *       - Users
 *     description: Logs out the user by clearing the authentication token (JWT).
 *     security:
 *       - bearerAuth: []  # This requires a valid JWT token for authentication
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized, no token or invalid token provided
 *       500:
 *         description: Internal server error
 */
userRouter.post('/logout', protectRoute, logoutUser);

/**
 * @swagger
 * /users/{userid}:
 *   put:
 *     summary: Update user information
 *     tags:
 *       - Users
 *     description: Updates user information based on user ID. Only authenticated users can update their own details.
 *     security:
 *       - bearerAuth: []  # Requires a valid JWT token for authentication
 *     parameters:
 *       - name: userid
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               profileImage:
 *                 type: string
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               email: johndoe@example.com
 *               profileImage: "https://example.com/profile.jpg"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized, no token or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.put('/:userid', protectRoute, updateUser);

/**
 * @swagger
 * /users/{userid}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     description: Deletes a user based on their ID. Only authenticated users can delete their own account or an admin can delete any user.
 *     security:
 *       - bearerAuth: []  # Requires a valid JWT token for authentication
 *     parameters:
 *       - name: userid
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized, no token or invalid token
 *       403:
 *         description: Forbidden, user is not allowed to delete this user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.delete('/:userid',protectRoute, deleteUser);

// Change a user's role by ID
//router.put('/:userid/role', protectRoute, changeRole);

module.exports = userRouter;
