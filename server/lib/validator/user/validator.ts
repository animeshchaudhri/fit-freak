import { check, query } from "express-validator";


export const validateUserRegister = [
      check("email")
      .notEmpty()
      .isEmail()
      .escape()
      .withMessage("Must me valid email address"),
  
    check("password").notEmpty().isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    }).withMessage(`Password must be more than 8 characters long with
          at least 1 lowercase, 1 uppercase, 1 number and 1 symbol`),
  ];
  export const validateUserLogin = [
    check("email")
      .notEmpty()
      .isEmail()
      .escape()
      .withMessage("Must me valid email address"),

    check("password").notEmpty().isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    }).withMessage(`Password must be more than 8 characters long with
          at least 1 lowercase, 1 uppercase, 1 number and 1 symbol`),
  ];

export const validateUserCreate = [
  check("first_name")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  check("last_name")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  check("phone")
    .notEmpty()
    .matches(/^\+?[\d\s-]+$/)
    .withMessage("Must be a valid phone number"),

  check("height")
    .optional()
    .isInt({ min: 50, max: 300 })
    .withMessage("Height must be between 50 and 300 cm"),

  check("weight")
    .optional()
    .isInt({ min: 20, max: 500 })
    .withMessage("Weight must be between 20 and 500 kg"),

  check("age")
    .optional()
    .isInt({ min: 13, max: 120 })
    .withMessage("Age must be between 13 and 120 years"),

  check("gender")
    .optional()
    .isIn(['male', 'female', 'Other', 'Prefer not to say'])
    .withMessage("Must be a valid gender option"),

  check("activity_level")
    .optional()
    .isIn(['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'])
    .withMessage("Must be a valid activity level"),

  check("fitness_goals")
    .optional()
    .isArray()
    .custom((value) => {
      const validGoals = [
        'Weight Loss',
        'Muscle Gain',
        'Improve Endurance',
        'Increase Flexibility',
        'Better Health',
        'Sports Performance'
      ];
      return value.every((goal: string) => validGoals.includes(goal));
    })
    .withMessage("Must contain valid fitness goals")
];
