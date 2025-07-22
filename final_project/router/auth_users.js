const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
  if (username) {
    return true
  } else {
    return false
  }

}

const authenticatedUser = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
  const foundUser = users.filter((user) => user.username === username && user.password === password)
  console.log(foundUser)
  if (foundUser[0]) {
    return true
  } else {
    return false
  }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const username = req.body.username;
  let validity = isValid(username);
  let authenticity = authenticatedUser(username, req.body.password)
  console.log(validity, authenticity)
  let token;
  if (validity && authenticity) {
    token = jwt.sign({"username": username}, "username", { expiresIn: 60 })
  } else {
    return res.status(300).json({ message: "Invalid credentials" });
  }
  req.session.authorization = {
    token, username
  }
  return res.send({ "Message": "User is successfully logged in" })
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { username, review } = req.body;
  const isbn = req.params.isbn;
  let newReview = {
    "username": username,
    "review": review
  };
  books[isbn].reviews[newReview.username] = newReview.review;
  console.log(books[isbn]);
  //Write your code here
  return res.status(300).json({ message: "Books updated successfully" });
});

regd_users.delete('/auth/review/:isbn', (req, res) => {
  const username = req.body.username;
  const isbn = req.params.isbn;
  console.log(books[isbn].reviews[username])
  delete books[isbn].reviews[username]
  console.log(books[isbn])
  res.send({"message": "Review successfully deleted"})
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
