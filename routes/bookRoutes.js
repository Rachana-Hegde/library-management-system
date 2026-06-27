const express = require("express");

const router = express.Router();

const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const {
  borrowBook,
  returnBook,
} = require("../controllers/memberController");

const {
  addBookValidation,
  updateBookValidation,
} = require("../validators/bookValidator");

const validate = require("../middleware/validate");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Add Book (Librarian Only)

router.post(
  "/",
  authMiddleware,
  roleMiddleware("librarian"),
  addBookValidation,
  validate,
  addBook
);

// Get All Books

router.get(
  "/",
  authMiddleware,
  getAllBooks
);

// Get Book By ID

router.get(
  "/:id",
  authMiddleware,
  getBookById
);

// Update Book

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("librarian"),
  updateBookValidation,
  validate,
  updateBook
);

// Delete Book

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("librarian"),
  deleteBook
);

// Borrow Book (Member Only)
router.post(
  "/:id/borrow",
  authMiddleware,
  roleMiddleware("member"),
  borrowBook
);

// Return Book (Member Only)
router.post(
  "/:id/return",
  authMiddleware,
  roleMiddleware("member"),
  returnBook
);

module.exports = router;