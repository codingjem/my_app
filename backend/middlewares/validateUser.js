const { check, body } = require("express-validator");

const register = [
    check("firstname").trim().notEmpty().withMessage("First Name is required"),
    check("lastname").trim().notEmpty().withMessage("Last Name is required"),
    check("email").isEmail().withMessage("Must be a valid Email Address"),
    check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
        }
        return true;
    }),
];

const login = [
    check("email").isEmail().withMessage("Must be a valid Email Address"),
    check("password").notEmpty().withMessage("Password is required"),
];

module.exports = { register, login };
