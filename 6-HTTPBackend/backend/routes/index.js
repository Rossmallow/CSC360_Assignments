/* routes/index.js */
/* Ross Nelson Assignment 6: HTTP Backend */
/* May 19th, 2020 */

const express = require('express');
const session = require('express-session');
const fetch = require('node-fetch');
const app = express();

module.exports = app;

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

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(session({
  secret: "Eu4bP#!7",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

let sessionData = undefined;

const renderHomePage = async (res, wishlist = []) => {
  let BS = await fetchBS();
  res.render('index', {
    title: 'RossCorp', bs: BS, wlistItems: wishlist
  });
};

/* GET home page. */
app.get('/', function (req, res, next) {
  if (sessionData === undefined) {
    sessionData = req.session;
    sessionData.wishlist = [];
  }
  renderHomePage(res, sessionData.wishlist);
});

app.post('/', function (req, res) {
  if (sessionData === undefined) {
    sessionData = req.session;
    sessionData.wishlist = [];
  }
  sessionData.wishlist.push({ item: req.body.wlistItem });
  console.log(sessionData.wishlist);
  renderHomePage(res, sessionData.wishlist);
});

app.get('/sqrt', function (req, res) {
  let num = Number(req.query.num);
  if (num < 1) {
    res.status(400).send("Please enter a valid number in the format: " +
      "/sqrt?num=[number].");
  }
  res.send({ sqrt: Math.sqrt(num) });
});

app.use(function (req, res, next) {
  res.status(404).send("Invalid page. Try again!");
});