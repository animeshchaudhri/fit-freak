import express from "express";
import { authenticateUser } from "../middleware/Auth";
import { 
  createChallengeController, 
  getUserChallengesController, 
  inviteToChallengeController, 
  updateChallengeProgressController 
} from "../controller/challenge/challenge.controller";
import { validateChallengeCreate } from "../lib/validator/challenge/validator";
import { validateRequest } from "../utils/validateRequest";

const router = express.Router();

/**
 * @swagger
 * /v1/challenge/create:
 *   post:
 *     summary: Create a new challenge
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - type
 *               - goal
 *               - startDate
 *               - endDate
 *               - points
 *             properties:
 *               title:
 *                 type: string
 *                 description: Challenge title
 *               description:
 *                 type: string
 *                 description: Challenge description
 *               type:
 *                 type: string
 *                 enum: [Steps, Distance, Calories, Workouts]
 *               goal:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               points:
 *                 type: number
 *               invitedUsers:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Challenge created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/create",
  authenticateUser(),
  validateChallengeCreate,
  validateRequest,
  createChallengeController
);

/**
 * @swagger
 * /v1/challenge/user-challenges:
 *   get:
 *     summary: Get all challenges for the authenticated user
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of challenges
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       type:
 *                         type: string
 *                       goal:
 *                         type: number
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                       points:
 *                         type: number
 *                       participants:
 *                         type: number
 *                       creatorId:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/user-challenges",
  authenticateUser(),
  getUserChallengesController
);

/**
 * @swagger
 * /v1/challenge/invite/{challengeId}/{userId}:
 *   post:
 *     summary: Invite a user to a challenge
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: challengeId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User invited successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Challenge or user not found
 */
router.post(
  "/invite/:challengeId/:userId",
  authenticateUser(),
  inviteToChallengeController
);

/**
 * @swagger
 * /v1/challenge/progress/{challengeId}:
 *   put:
 *     summary: Update challenge progress
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: challengeId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - progress
 *             properties:
 *               progress:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *     responses:
 *       200:
 *         description: Progress updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Challenge not found
 */
router.put(
  "/progress/:challengeId",
  authenticateUser(),
  updateChallengeProgressController
);

export default router;