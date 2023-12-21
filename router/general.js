const express = require("express");
let books = require("../models/booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let {
  getAllBooks,
  searchByISBN,
  searchByTitle,
  searchByAuthor,
  getReviews
} = require("../controllers/BooksController.js");
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  try {
    const allBooks = await getAllBooks();
    return res.status(200).json({ books: allBooks });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  try {
    // console.log(typeof req.params.isbn, req.params.isbn)
    const books = await searchByISBN(+req.params.isbn);
    if (books.length === 0 || books === undefined) {
      return res.status(404).json({ error: 'book not found' });
    }
    return res.status(200).json({ books: books });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  try {
    const books = await searchByAuthor(req.params.author);
    if (books.length === 0 || books === undefined) {
      return res.status(404).json({ error: 'books not found' });
    }
    return res.status(200).json({ books: books });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  try {
    const books = await searchByTitle(req.params.title);
    if (books.length === 0 || books === undefined) {
      return res.status(404).json({ error: 'books not found' });
    }
    return res.status(200).json({ books: books });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Get book review
public_users.get("/review/:isbn", async function (req, res) {
  try {
    const books = await getReviews(+req.params.isbn);
    if (books.length === 0 || books === undefined) {
      return res.status(404).json({ error: 'books not found' });
    }
    return res.status(200).json({ review: books });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports.general = public_users;
