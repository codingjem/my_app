const express = require("express");
const router = express.Router();
const validateUser = require("./middlewares/validateUser");
const usersController = require("./controllers/usersController");

router.get("/", (req, res) => {});
router.post("/registerUser", validateUser.register, usersController.registerUser);
router.post("/loginUser", validateUser.login, usersController.loginUser);

module.exports = router;
