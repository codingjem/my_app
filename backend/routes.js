const express = require("express");
const router = express.Router();
const validateUser = require("./middlewares/validateUser");
const usersController = require("./controllers/usersController");
const refreshTokenController = require("./controllers/refreshTokenController");
const { verifyJWT } = require("./middlewares/verifyJWT");

router.get("/", (req, res) => {});
router.get("/home", verifyJWT, (req, res) => {}); 
router.post("/registerUser", validateUser.register, usersController.registerUser);
router.post("/loginUser", validateUser.login, usersController.loginUser);

router.post("/getToken", refreshTokenController.handleRefreshToken);
router.post("/checkToken", verifyJWT, (req, res) => { res.status(200).json({ message: "Token is VALID!!!" }) });
router.post("/logoutUser", usersController.logoutUser);

module.exports = router;
