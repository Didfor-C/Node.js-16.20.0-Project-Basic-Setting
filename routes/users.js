const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../config/middleware/authMiddleware");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../config/middleware/inputValidator");

router.post("/register", validateUserRegistration, userController.registerUser);
router.post("/login", validateUserLogin, userController.loginUser);
router.get("/profile", authMiddleware, userController.getUserProfile);
router.put("/update", authMiddleware, userController.updateUser);

module.exports = router;
