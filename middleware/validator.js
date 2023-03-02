// const { check, validationResult } = require("express-validator");

// // this is error handler created by express-validator
// // so create array of errors in first middleware for name and email and password
// exports.userValidator = [
//   check("name").trim().not().isEmpty().withMessage("name is Missing"),
//   check("email").normalizeEmail().isEmail().withMessage("email is invalid"),
//   check("password")
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage("password is missing")
//     .isLength({ min: 8, max: 20 })
//     .withMessage("passord must be between 8 and 20 charecters"),
// ];

// // this is validate password only used when to change password
// exports.validatePasswordOnly = [
//   check("newpassword")
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage("password is missing")
//     .isLength({ min: 8, max: 20 })
//     .withMessage("passord must be between 8 and 20 charecters"),
// ];

// // this is sing in validator check the email and password
// exports.singInValidator = [
//   check("email").normalizeEmail().isEmail().withMessage("email is invalid"),
//   check("password").trim().not().isEmpty().withMessage("password is missing"),
// ];

// // this is the seconde middleware used with the first one it catch the error array
// exports.validate = (req, res, next) => {
//   const error = validationResult(req).array();
//   if (error.length > 0) {
//     return res.status(401).json({ error: error[0].msg });
//   }

//   next();
// };

// exports.actorInfoValidator = [
//   check("name").trim().not().isEmpty().withMessage("name is Missing"),
//   check("about").trim().not().isEmpty().withMessage("about is required field"),
//   check("gender")
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage("gender is required field"),
// ];
