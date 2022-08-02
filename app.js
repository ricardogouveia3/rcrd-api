// Main deps
const express = require("express");
const app = express();

// Modules
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
  res.send(labs);
});

//App start
let port = 3000;
console.log("App starting on " + port);
app.listen(port);
