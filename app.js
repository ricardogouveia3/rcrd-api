// Main deps
const express = require("express");
const app = express();
const port = process.env.PORT || 3000

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
app.get("/", (req, res, next) => {
  res.send("Hello world! Welcome to RCRD API. Listening port "+ port + ". Request to an endpoint to begin...");
});

app.get("/portfolio", (req, res, next) => {
  res.send(portfolio);
});

app.get("/labs", (req, res, next) => {
  res.send(labs);
});

//App start
app.listen(port, () => {
  console.log("App listening at " + port);
});
