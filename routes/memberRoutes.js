const express = require("express");

const router = express.Router();

const {
    getMembers,
    deleteMember,
    myBorrowedBooks
} = require("../controllers/memberController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// Get All Members

router.get(
    "/",
    authMiddleware,
    roleMiddleware("librarian"),
    getMembers
);

// Delete Member

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("librarian"),
    deleteMember
);

// My Borrowed Books

router.get(
    "/me/books",
    authMiddleware,
    roleMiddleware("member"),
    myBorrowedBooks
);

module.exports = router;