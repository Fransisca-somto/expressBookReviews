const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  // const {username, password} = req.body;
  const username = req.body.username;
  const password = req.body.password;
  let newUser = {
    "username": username,
    "password": password
  }
  users.push(newUser)
  console.log(users)
  return res.status(200).json({message: "New user successfully created"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  return await res.send(JSON.stringify({books}, null, 4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let specific_book = books[isbn];
  return await res.send(JSON.stringify(specific_book, null, 4));
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  const author = req.params.author;
  for (let i = 1; i < Object.entries(books).length; i++) {
    if (books[i].author === author) {
      let thebook = books[i];
      return await res.send(JSON.stringify({thebook}, null, 4));
    }
  }
  return res.status(300).json({message: "Book not in the shelve"});
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  const title = req.params.title;
  for (let i = 1; i < Object.entries(books).length; i++) {
    if (books[i].title === title) {
      let thisbook = books[i]
      return await res.send(JSON.stringify({thisbook}, null, 4))
    }
  }
  return res.status(300).json({message: "Book not in the bookshelve"});
});

//  Get book review
public_users.get('/review/:isbn',async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let bookReview = books[isbn].reviews

  return await res.send(bookReview);
});

module.exports.general = public_users;
