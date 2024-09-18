const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const usersModel = require("../models/usersModel");

const registerUser = async (req, res) => {
    checkErrors(req, res);
    const { firstname, lastname, email, password } = req.body;

    // Check if email is already used
    const user = await usersModel.findUser(email);
    if (user) {
        return res.status(400).json({ email: "Email is already used by other user"});
    }

    try {

        // Encrypt password
        const hashedPwd = await bcrypt.hash(password, 10);
        
        const newUser = { 
            firstname, 
            lastname, 
            email, 
            password: hashedPwd,
        }

        // Send newUser to model
        const result = await usersModel.addUser(newUser);
        res.status(200).json({ message: `${result.firstname}'s Account is created Succesfully!` });
    } catch (err) {
        console.error(err);

    }
};

const loginUser = async (req, res) => {
    checkErrors(req, res);

}

const checkErrors = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorArr = errors.errors;
        // arr.reduce(() => {}, initialValue)
        const errorObj = errorArr.reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
        }, {});

        return res.status(400).json(errorObj);
    }
}

module.exports = { registerUser, loginUser };