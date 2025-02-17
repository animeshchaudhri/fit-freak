import express from "express";
import type { Router } from "express";
import { validateUserLogin, validateUserRegister } from "../lib/validator";
import { validateRequest } from "../utils/validateRequest";
import { getUserDetailsController, loginUserController, registerUserController, userDetailsController } from "../controller/user/user.controller";
import { validateUserCreate } from "../lib/validator/user/validator";
import { authenticateUser } from "../middleware/Auth";

const router: Router = express.Router();

/**
 * @swagger
 * /v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
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
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (must be at least 8 characters with 1 lowercase, 1 uppercase, 1 number and 1 symbol)
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 email:
 *                   type: string
 *                   format: email
 *       409:
 *         description: User with this email already exists
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post(
    "/register",
    validateUserRegister,
    validateRequest,
    registerUserController
  );

/**
 * @swagger
 * /v1/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
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
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT access token
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     email:
 *                       type: string
 *                       format: email
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post("/login", validateUserLogin, validateRequest, loginUserController);


/**
 * @swagger
 * /v1/user/create-user:
 *   post:
 *     summary: Create or update user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - phone
 *             properties:
 *               first_name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: User's first name
 *               last_name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: User's last name
 *               phone:
 *                 type: string
 *                 pattern: ^\+?[\d\s-]+$
 *                 description: User's phone number
 *               height:
 *                 type: integer
 *                 minimum: 50
 *                 maximum: 300
 *                 description: Height in centimeters
 *               weight:
 *                 type: integer
 *                 minimum: 20
 *                 maximum: 500
 *                 description: Weight in kilograms
 *               age:
 *                 type: integer
 *                 minimum: 13
 *                 maximum: 120
 *                 description: User's age
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other, Prefer not to say]
 *                 description: User's gender
 *               activity_level:
 *                 type: string
 *                 enum: [Sedentary, Lightly Active, Moderately Active, Very Active, Extremely Active]
 *                 description: User's activity level
 *               fitness_goals:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [Weight Loss, Muscle Gain, Improve Endurance, Increase Flexibility, Better Health, Sports Performance]
 *                 description: User's fitness goals
 *     responses:
 *       200:
 *         description: User details created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     phone:
 *                       type: string
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/create-user", authenticateUser(), validateUserCreate, validateRequest, userDetailsController);

/**
 * @swagger
 * /v1/user/user-details:
 *   get:
 *     summary: Get authenticated user's details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     height:
 *                       type: integer
 *                     weight:
 *                       type: integer
 *                     age:
 *                       type: integer
 *                     gender:
 *                       type: string
 *                     activity_level:
 *                       type: string
 *                     fitness_goals:
 *                       type: array
 *                       items:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User details not found
 *       500:
 *         description: Internal server error
 */
router.get("/user-details", authenticateUser(), validateRequest, getUserDetailsController);

export default router;
