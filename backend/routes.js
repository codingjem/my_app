const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {});
router.post("/registerUser", (req, res) => {
    console.log("User Registered!");
});
router.post("/loginUser", (req, res) => {
    console.log("User Logged in!");
});

module.exports = router;
