const { check, validationResult } = require("express-validator");

const validateUserRegistration = [
  check("username").isString().trim().notEmpty(),
  check("userID").isString().trim().notEmpty(),
  check("poneNumber").isString().trim().notEmpty(),
  check("email").isEmail().normalizeEmail(),
  check("password").isLength({ min: 6 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateUserLogin = [
  check("email").isString().trim().notEmpty(),
  check("password").isLength({ min: 6 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ code: 400, data: { errors: errors.array() }, message: 1 });
      //return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = {
  validateUserRegistration,
  validateUserLogin,
};
