/* routes/index.js */
/* Ross Nelson Assignment 6: HTTP Backend */
/* May 19th, 2020 */

const express = require('express');
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

const post = () => {
  const body = {
    title: "foo",
    body: "bar",
    userId: 1
  }

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
}

app.set('view engine', 'hbs');
app.use(express.static('public'));

/* GET home page. */
app.get('/', async function (req, res, next) {
  let BS = await fetchBS();
  post();
  res.render('index', {
    title: 'RossCorp', bs: BS
  });
});

app.get('/sqrt', function (req, res) {
  res.send({ sqrt: 2 });
});

app.use(function (req, res, next) {
  res.status(404).send("Invalid page. Try again!");
});