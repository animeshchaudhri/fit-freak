import { check } from "express-validator";

export const validateChallengeCreate = [
  check("title")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  check("description")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  check("type")
    .notEmpty()
    .isIn(['Steps', 'Distance', 'Calories', 'Workouts'])
    .withMessage("Invalid challenge type"),

  check("goal_type")
    .notEmpty()
    .isIn(['Daily', 'Weekly', 'Total'])
    .withMessage("Invalid goal type"),

  check("goal_value")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Goal value must be a positive number"),

  check("start_date")
    .notEmpty()
    .isISO8601()
    .withMessage("Invalid start date"),

  check("end_date")
    .notEmpty()
    .isISO8601()
    .withMessage("Invalid end date")
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.start_date)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  check("reward_points")
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage("Reward points must be a positive integer"),

  check("invited_users")
    .optional()
    .isArray()
    .withMessage("Invited users must be an array")
];

export const validateChallengeProgress = [
  check("progress")
    .notEmpty()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Progress must be between 0 and 100")
]; 