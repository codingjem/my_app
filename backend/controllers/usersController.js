const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
    checkErrors(req, res);

    const { firstname, lastname, email, password } = req.body;
    try {

        // Encrypt password
        const hashedPwd = await bcrypt.hash(password, 10);
        
        const newUser = { 
            firstname, 
            lastname, 
            email, 
            password: hashedPwd,
        }
    } catch (err) {

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