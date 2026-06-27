const express = require("express");

const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");

const validate = require("../middleware/validate");

// Register
router.post(
  "/register",
  registerValidation,
  validate,
  register
);

// Login
router.post(
  "/login",
  loginValidation,
  validate,
  login
);

module.exports = router;