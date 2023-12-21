const express = require("express");
const jwt = require("jsonwebtoken");
// let books = require("../models/booksdb.js");
let { updateReviews, deleteReviews } = require("../controllers/BooksController.js");
const regd_users = express.Router();

let users = [
  {
    username: "john snow",
    password: "johnsnow",
  },
];

const isValid = (username) => {
  //returns boolean
  const user_auth = users.find((user) => user.username === username);
  const result = user_auth ? true : false;
  return result;
  //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
  //returns boolean
  const user_auth = users.find(
    (user) => user.username === username && user.password === password
  );
  const result = user_auth ? true : false;
  return result;
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };
    return res
      .status(200)
      .json({
        message: "User successfully logged in",
        access_token: accessToken,
      });
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", async (req, res) => {
  try {
    const books = await updateReviews({
      isbn: req.params.isbn,
      id: req.query.index,
      user: req.query.user,
      comment: req.query.comment,
      date: req.query.date,
    });
    if (books.length === 0 || books === undefined) {
      return res.status(404).json({ message: 'reviews not found' });
    }
    return res.status(200).json({ review: books });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
regd_users.delete("/auth/review/:isbn", async (req, res) => {
  try {
    const books = await deleteReviews({
      isbn: req.params.isbn,
      id: req.query.index,
    });
    return res.status(200).json({ message: "review deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
