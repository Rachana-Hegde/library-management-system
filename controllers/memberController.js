const mongoose = require("mongoose");
const User = require("../models/User");
const Book = require("../models/Book");
const Borrow = require("../models/Borrow");


// Get All Members

const getMembers = async (req, res) => {

    try {

        const members = await User.find({ role: "member" })
        .select("-password")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: members.length,
            data: members
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Member

const deleteMember = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid member ID"
            });

        }

        const member = await User.findById(req.params.id);

        if (!member) {

            return res.status(404).json({
                success: false,
                message: "Member not found"
            });

        }

        if (member.role !== "member") {

            return res.status(400).json({
                success: false,
                message: "Only members can be deleted"
            });

        }

        await member.deleteOne();

        res.status(200).json({
            success: true,
            message: "Member deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Borrow Book

const borrowBook = async (req, res) => {
  try {

    const bookId = req.params.id;

    // Validate Book ID
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID"
      });
    }

    // Find Book
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    // Check Availability
    if (book.availableQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Book is currently unavailable"
      });
    }

    // Check Duplicate Borrow
    const alreadyBorrowed = await Borrow.findOne({
      memberId: req.user._id,
      bookId,
      status: "borrowed"
    });

    if (alreadyBorrowed) {
      return res.status(400).json({
        success: false,
        message: "You have already borrowed this book"
      });
    }

    // Create Borrow Record
    await Borrow.create({
      memberId: req.user._id,
      bookId,
      status: "borrowed"
    });

    // Reduce Available Quantity
    book.availableQuantity -= 1;

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Return Book

const returnBook = async (req, res) => {
  try {

    const bookId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }

    const borrowRecord = await Borrow.findOne({
      memberId: req.user._id,
      bookId,
      status: "borrowed",
    });

    if (!borrowRecord) {
      return res.status(400).json({
        success: false,
        message: "You have not borrowed this book",
      });
    }

    borrowRecord.status = "returned";
    borrowRecord.returnDate = new Date();

    await borrowRecord.save();

    const book = await Book.findById(bookId);

    if (book) {
      book.availableQuantity += 1;
      await book.save();
    }

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// My Borrowed Books

const myBorrowedBooks = async (req, res) => {

  try {

    const books = await Borrow.find({
      memberId: req.user._id,
      status: "borrowed",
    })
      .populate("bookId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
    getMembers,
    deleteMember,
    borrowBook,
    returnBook,
    myBorrowedBooks
};