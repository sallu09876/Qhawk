const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

// 🔹 SIGNUP
router.post("/signup", authController.signup);

// 🔹 LOGIN
router.post("/login", authController.login);

module.exports = router;
