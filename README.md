# 📚 Library Management System

A full-stack **Library Management System Backend** built using **Node.js, Express.js, MongoDB Atlas, and JWT Authentication**.
The application provides secure role-based access for **Librarians** and **Members**, allowing efficient management of books, members, and borrowing activities through RESTful APIs.

## 🚀 Features

### 🔐 Authentication

* Member Registration
* Secure Login
* JWT Authentication
* Password Hashing using bcrypt
* Role-Based Authorization
* Protected Routes

### 👨‍🏫 Librarian Features

* Add New Books
* View All Books
* View Book Details
* Update Book Information
* Delete Books
* View All Registered Members
* Delete Member Accounts


### 👨‍🎓 Member Features

* View Available Books
* Borrow Books
* Return Borrowed Books
* View My Borrowed Books
* Prevent Duplicate Borrowing


### ⚙️ Backend

* Node.js
* Express.js
* RESTful APIs
* JWT Authentication
* bcrypt Password Hashing
* Express Validator
* Mongoose ODM


### 🗄️ Database

* MongoDB Atlas
* User Collection
* Book Collection
* Borrow Collection
* Persistent Cloud Database


### ⭐ Bonus Features

* Pagination
* Search Books by Title or Author
* Filter Books by Category


## 🛠️ Tech Stack

| Layer          | Technology          |
| -------------- | ------------------- |
| Backend        | Node.js, Express.js |
| Database       | MongoDB Atlas       |
| Authentication | JWT, bcrypt         |
| Validation     | Express Validator   |
| ORM            | Mongoose            |


## 📁 Project Structure

```text
library-management-system/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── memberController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── validate.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Borrow.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── memberRoutes.js
│
├── validators/
│   ├── authValidator.js
│   └── bookValidator.js
│
├── utils/
│   ├── generateToken.js
│   └── seedLibrarian.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```


## ⚙️ Setup Instructions

### 🔹 1. Clone the Repository

```bash
git clone [https://github.com/Rachana-Hegde/library-management-system](https://github.com/Rachana-Hegde/library-management-system).git
cd library-management-system
```


### 🔹 2. Install Dependencies

```bash
npm install
```


### 🔹 3. Create Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secret_key
```

### 🔹 4. Seed Librarian Account

```bash
node utils/seedLibrarian.js
```

Default Librarian Credentials

```
Email: admin@library.com
Password: admin123
```


### 🔹 5. Run the Application

Development

```bash
npm run dev
```

Production

```bash
npm start
```


## ▶️ API Base URL

```
http://localhost:5000
```


## 🔌 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | `/api/auth/register` | Register Member |
| POST   | `/api/auth/login`    | Login User      |


### 📚 Books

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | `/api/books`            | Add Book (Librarian) |
| GET    | `/api/books`            | Get All Books        |
| GET    | `/api/books/:id`        | Get Book Details     |
| PUT    | `/api/books/:id`        | Update Book          |
| DELETE | `/api/books/:id`        | Delete Book          |
| POST   | `/api/books/:id/borrow` | Borrow Book          |
| POST   | `/api/books/:id/return` | Return Book          |


### 👥 Members

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| GET    | `/api/members`          | Get All Members     |
| DELETE | `/api/members/:id`      | Delete Member       |
| GET    | `/api/members/me/books` | View Borrowed Books |


## 🔐 Security

* JWT-based Authentication
* Password Hashing using bcrypt
* Role-Based Authorization
* Protected API Routes
* Duplicate Email Validation
* Duplicate ISBN Validation
* Duplicate Borrow Prevention
* MongoDB ObjectId Validation
* Input Validation using Express Validator


## 📌 Validation

* Valid Email Format
* Minimum Password Length
* Required Book Fields
* Non-negative Quantity Validation
* Duplicate Email Check
* Duplicate ISBN Check
* Invalid MongoDB ID Validation


## ⚠️ Notes

* Librarians can manage books and members.
* Members can borrow and return books.
* Passwords are securely stored using bcrypt.
* All protected APIs require a valid JWT token.
* Environment variables are stored in `.env` and are not committed to GitHub.


## 📌 Conclusion

This project demonstrates:

* RESTful API Development
* JWT Authentication & Authorization
* Role-Based Access Control
* MongoDB Database Design
* CRUD Operations
* Request Validation
* Secure Password Storage
* Borrow & Return Workflow
* Production-Ready Backend Architecture


## 👩‍💻 Author

**Rachana Hegde**

🔗 GitHub: https://github.com/Rachana-Hegde

## 🌐 Live API

https://library-management-system-ns9v.onrender.com
