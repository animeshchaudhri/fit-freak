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

  check("goal_type")
    .notEmpty()
    .isIn(['steps', 'calories', 'distance', 'activeMinutes', 'custom'])
    .withMessage("Invalid goal type"),

  check("goal_value")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Goal value must be a positive number"),

  check("duration")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("Duration must be at least 1 day"),

  check("start_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid start date"),

  check("end_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid end date")
    .custom((endDate, { req }) => {
      if (endDate && req.body.start_date && new Date(endDate) <= new Date(req.body.start_date)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  check("reward_points")
    .optional()
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