// Main deps
const express = require("express");
const app = express();

// Data files
const portfolio = require('./apps/rcrd/portfolio.json');

const ptBRdic = require('./apps/mpg/words_reduce_br.json');
const enUSdic = require('./apps/mpg/words_reduce_en.json');


// Global functions
const hundredRandom = (dic) => {
  const numberSelected = 100;
  let selectedWords = []

  while (selectedWords.length < numberSelected) {
    let word = dic[Math.floor(Math.random() * dic.length)];

    if(!selectedWords.includes(word)){
      selectedWords.push(word);
    }
  }

  selectedWords.sort();
  return selectedWords;
}


// Endpoints
app.get("/rcrd/portfolio", (req, res, next) => {
  res.send(portfolio);
});

app.get("/mpg/en", (req, res, next) => {
  res.send(hundredRandom(enUSdic));
});

app.get("/mpg/br", (req, res, next) => {
  res.send(hundredRandom(ptBRdic));
});


// App start
app.listen(3000, () => { });