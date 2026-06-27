const { body } = require("express-validator");

const addBookValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required"),

  body("isbn")
    .trim()
    .notEmpty()
    .withMessage("ISBN is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
];

const updateBookValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),

  body("author")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Author cannot be empty"),

  body("isbn")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("ISBN cannot be empty"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty"),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
];

module.exports = {
  addBookValidation,
  updateBookValidation,
};