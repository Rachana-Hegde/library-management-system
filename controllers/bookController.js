const mongoose = require("mongoose");
const Book = require("../models/Book");

const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      category,
      quantity,
    } = req.body;

    // Check duplicate ISBN
    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "Book with this ISBN already exists",
      });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      quantity,
      availableQuantity: quantity,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const getAllBooks = async (req, res) => {

  try {

    let {
      page = 1,
      limit = 10,
      search,
      category,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          author: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Category Filter
    if (category) {
      filter.category = category;
    }

    const totalBooks = await Book.countDocuments(filter);

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      totalBooks,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      data: books,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Get Book By ID

const getBookById = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Book

const updateBook = async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const oldQuantity = book.quantity;

    Object.assign(book, req.body);

    if (req.body.quantity !== undefined) {

      const difference = req.body.quantity - oldQuantity;

      book.availableQuantity += difference;

      if (book.availableQuantity < 0) {
        book.availableQuantity = 0;
      }

    }

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Delete Book

const deleteBook = async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};