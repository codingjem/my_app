const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const usersModel = require("../models/usersModel");
const refreshTokenModel = require("../models/refreshTokenModel");

const registerUser = async (req, res) => {
    checkErrors(req, res);
    const { firstname, lastname, email, password } = req.body;

    // Check if email is already used
    const user = await usersModel.findUser(email);

    if (user.exists) {
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

    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await usersModel.getUser(email);
        if (!user) {
            return res.status(400).json({ password: "Invalid email or password" });
        }
        console.log(user);

        // Compare password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ password: "Invalid email or password" });
        }

        // Create Access Token
        const accessToken = jwt.sign(
            { email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" },
        )

        // Create Refresh Token
        const refreshToken = jwt.sign(
            { email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }, // set this to long term
        )

        // Save Refresh Token to database
        const tokenSaved = await refreshTokenModel.addRefreshToken(
            { userId: user.id, refreshToken }
        );

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "Lax", // "Lax" for local development, "None" requires HTTPS
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        })  //  secure: true -> put this back when in production, production uses https while http during deevlopment
        // (name, what we want to pass, option) - maxAge is 1 day
        // cookies be vulnerable to JS but if we set the cookie to http-only it is not available to JS so that's what we want to do
        res.json({ 
            accessToken, 
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error!", err });
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "Lax", // "Lax" for local development, "None" requires HTTPS
        secure: false,
    });
    const user = req.body;
    console.log("USER LOGGING OUT", user);
    await refreshTokenModel.deleteRefreshToken({ userId: user.id });
    res.status(200).json({ message: "User Logged Out!" });
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

module.exports = { registerUser, loginUser, logoutUser };