const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

module.exports = router;

const fetchBS = () => {
  return fetch('https://corporatebs-generator.sameerkumar.website/')
    .then(response => response.json())
    .then(data => {
      return renderPage(data.phrase.toLowerCase());
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

fetchBS();


const renderPage = (BS) => {
  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'RossCorp', bs: BS
    });
  });

  post();
}

