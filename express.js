const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 5000;
// Middleware
app.use(bodyParser.json());
// Sample book data
const books = JSON.parse(fs.readFileSync("./Books.json"));
// Task 1: Get the book list available in the shop
app.get("/books", (req, res) => {
  res.status(200).json({
    status: "success",
    count: books.length,
    data: {
      Book_Lists: books,
    },
  });
});
// Task 2: Get the books based on ISBN
app.get("/books/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((book) => book.ISBN === isbn);
  if (book) {
    res.status(200).json({
      status: "success",
      book_isbn: isbn,
      data: {
        Book_by_isbn: book,
      },
    });
  } else {
    res.status(404).send({
      status: "FAIL",
      message:
        "The Book of by this  ID = " + "  " + isbn + "  " + "is not found!!!",
    });
  }
});
// Task 3: Get all books by Author
app.get("/books/author/:author", (req, res) => {
  const author = req.params.author;
  const booksByAuthor = books.filter((book) => book.author === author);
  if (booksByAuthor.length > 0) {
    res.status(200).json({
      status: "success",
      book_author: author,
      data: {
        Book_by_Author: booksByAuthor,
      },
    });
  } else {
    res.status(404).send({
      status: "FAIL",
      message:
        "The Book by Author  " + "  " + author + "  " + "is not found!!!",
    });
  }
});
// Task 4: Get all books based on Title
app.get("/books/title/:title", (req, res) => {
  const title = req.params.title;
  const booksByTitle = books.filter((book) => book.title === title);
  if (booksByTitle.length > 0) {
    res.status(200).json({
      status: "success",
      book_title: title,
      data: {
        Book_by_Title: booksByTitle,
      },
    });
  } else {
    res.status(404).send({
      status: "FAIL",
      message:
        "The Book in this Title  " + "  " + title + "  " + "is not found!!!",
    });
  }
});
// Task 5: Get book Review
app.get("/books/:isbn/review", (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((book) => book.ISBN === isbn);
  if (book && book.review) {
    res.status(200).json({
      status: "success",
      book_isbn: isbn,
      data: {
        Book_review: book.review,
      },
    });
  } else {
    res.status(404).send({
      status: "FAIL",
      message:
        "The Book in this ISBN  " + "  " + isbn + "  " + "is not found!!!",
    });
  }
});
// Task 6: Register New user
let users = [];
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await registerUser(username, password);
    res.status(200).json({
      status: "success",
      user_count: newUser.length,
      data: {
        user_data: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "FAIL",
      message: "Internal server error",
    });
  }
});
// Function to register a new user
async function registerUser(username, password) {
  const newUser = { username, password };
  users.push(newUser);
  return newUser;
}
// Task 7: Login as a Registered user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await loginUser(username, password);
    if (user) {
      res.json({ message: "Login successfully" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Function to login a registered user
async function loginUser(username, password) {
  return users.find(
    (user) => user.username === username && user.password === password
  );
}
// Middleware for authentication
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (token === "valid token") {
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
}
// Task 8: Add/Modify a book review
app.post("/books/:isbn/review", authenticate, async (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;
  // Assuming username is sent in headers
  const username = req.headers["username"];
  try {
    const result = await addOrModifyReview(username, isbn, review);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Function to add or modify a book review
async function addOrModifyReview(username, isbn, review) {
  const book = books.find((b) => b.ISBN === isbn);
  if (!book) {
    throw new Error("Book not found");
  }
  // Check if the user has already reviewed this book
  const existingReview = book.review.find((r) => r.username === username);
  if (existingReview) {
    existingReview.review = review;
    return { message: "Review modified successfully" };
  } else {
    book.review.push({ username, review });
    return { message: "Review added successfully" };
  }
}
// Task 9: Delete book review added by that particular user
app.delete("/books/:isbn/review", authenticate, async (req, res) => {
  const isbn = req.params.isbn;
  // Assuming username is sent in headers
  const username = req.headers["username"];
  try {
    const result = await deleteReview(username, isbn);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Function to delete a book review
async function deleteReview(username, isbn) {
  const book = books.find((b) => b.ISBN === isbn);
  if (!book) {
    throw new Error("Book not found");
  }
  const index = book.reviews.findIndex((r) => r.username === username);
  if (index !== -1) {
    book.reviews.splice(index, 1);
    return { message: "Review deleted successfully" };
  } else {
    throw new Error("Review not found");
  }
}
//// Task 10: Get all books - Using async callback function
app.get("/books", async (req, res) => {
  try {
    const allBooks = await getAllBooks();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Function to retrieve all books
async function getAllBooks() {
  return books;
}
// Task 11: Search by ISBN - Using Promises
app.get("/books/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  searchByISBN(isbn)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});
// Function to search for a book by ISBN
function searchByISBN(isbn) {
  return new Promise((resolve, reject) => {
    const book = books.find((b) => b.ISBN === isbn);
    resolve(book);
  });
}
// Task 12: Search by Author
app.get("/books/author/:author", async (req, res) => {
  const author = req.params.author;
  try {
    const booksByAuthor = await searchByAuthor(author);
    res.json(booksByAuthor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Function to search for books by author
async function searchByAuthor(author) {
  const booksByAuthor = books.filter((book) => book.author === author);
  return booksByAuthor;
}

// Task 13: Search by Title
app.get("/books/title/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const booksByTitle = await searchByTitle(title);
    res.json(booksByTitle);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Function to search for books by title
async function searchByTitle(title) {
  const booksByTitle = books.filter((book) => book.title.includes(title));
  return booksByTitle;
}
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
