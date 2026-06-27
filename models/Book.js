const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },

    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    availableQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.index({ title: "text", author: "text" });

module.exports = mongoose.model("Book", bookSchema);