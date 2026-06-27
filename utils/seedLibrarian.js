const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const User = require("../models/User");

dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

const seedLibrarian = async () => {
  try {
    const existing = await User.findOne({
      email: "admin@library.com",
    });

    if (existing) {
      console.log("Librarian already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Library Admin",
      email: "admin@library.com",
      password: hashedPassword,
      role: "librarian",
    });

    console.log("Librarian created successfully.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedLibrarian();