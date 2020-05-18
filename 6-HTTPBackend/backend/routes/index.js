/* routes/index.js */
/* Ross Nelson Assignment 6: HTTP Backend */
/* May 19th, 2020 */

const express = require('express');
const session = require('express-session');
const fetch = require('node-fetch');
const app = express();

module.exports = app;

app.set('view engine', 'hbs');
app.use(express.static('public'));
// Create Session
app.use(session({
  secret: "Eu4bP#!7",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// Global variable that holds session data.
let sessionData = undefined;

// Calls the Corporate BS Generator API rand returns some BS.
const fetchBS = () => {
  return fetch('https://corporatebs-generator.sameerkumar.website/')
    .then(response => response.json())
    .then(data => {
      return data.phrase.toLowerCase();
    })
    .catch(err => {
      console.error("BS request failed", err);
      return "don't fail like this API request";
    });
};

// Fetches some BS then renders the index.
const renderHomePage = async (res, wishlist) => {
  let BS = await fetchBS();
  res.render('index', {
    title: 'RossCorp', bs: BS, wlistItems: wishlist
  });
};

// Checks if a session has been created. If not, create it.
const checkSessionData = req => {
  if (sessionData === undefined) {
    sessionData = req.session;
    sessionData.wishlist = [];
  }
}

// Called when the index is requested.
app.get('/', function (req, res, next) {
  checkSessionData(req);
  renderHomePage(res, sessionData.wishlist);
});

// Called when a post request is sent to index.
// Adds the posted data to the session.
app.post('/', function (req, res) {
  checkSessionData(req);
  sessionData.wishlist.push({ item: req.body.wlistItem });
  renderHomePage(res, sessionData.wishlist);
});

// Square Root API.
// Returns the value of a number passed via query as JSON.
app.get('/sqrt', function (req, res) {
  let num = Number(req.query.num);
  if (num < 1) {
    res.status(400).send("Please enter a valid number in the format: " +
      "/sqrt?num=[number].");
  }
  res.send({ sqrt: Math.sqrt(num) });
});

// Returns 404 error if route does not exist.
app.use(function (req, res, next) {
  res.status(404).send("Invalid page. Try again!");
});