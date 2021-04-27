// Main deps
const express = require("express");
const app = express();

// Modules
const mpg = require('./modules/mpg');
const labs = require('./modules/labs');
const portfolio = require('./modules/portfolio');


// Global config
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Endpoints
app.get("/portfolio", (req, res, next) => {
  res.send(portfolio);
});

app.get("/labs", (req, res, next) => {
  res.send(labs.data);
});

app.get("/mpg/en", (req, res, next) => {
  res.send(mpg.hundredRandom('en'));
});

app.get("/mpg/br", (req, res, next) => {
  res.send(mpg.hundredRandom('ptbr'));
});

//App start
let port = 3000;
app.listen(port);
