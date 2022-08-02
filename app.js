// Main deps
const express = require("express");
const app = express();

// Modules
const labs = require('./modules/labs');
const portfolio = require('./modules/portfolio');


// Global config
app.use(function (res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Endpoints
app.get("/portfolio", (res) => {
  res.send(portfolio);
});

app.get("/labs", (res) => {
  res.send(labs.data);
});

//App start
let port = 3000;
app.listen(port);
