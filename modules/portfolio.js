// main variables and requires
const http = require('http');
const backupPortfolio = require('./../data/backup_portfolio.json');

const exportable = {
  data: {}
};

// Modules
const spreadsheetParse = require('./spreadsheet-parse');

// request to google spreadsheets
const url = {
  host: 'spreadsheets.google.com',
  path: '/feeds/cells/1B7WNCHRulCXZQjIJWiBgAyfZLQ4hMDK25x-YLxGwvzQ/1/public/full?alt=json'
};

// prepare request and return data
requestMaker = function(response) {
  let data = '';

  response.on('data', function (newData) {
    data += newData;
  });

  response.on('error', function(thisError){
    exportable.data = {};
   });

  response.on('end', function () {
    try {
      const parsedData = JSON.parse(data);
      const arrayFormatedData = spreadsheetParse.parseSpreadsheetJsonIntoArray(parsedData);
      const portfolioFormatedData = spreadsheetParse.portfolioObjectCreator(arrayFormatedData);

      exportable.data = portfolioFormatedData;
    } catch (error) {
      exportable.data = backupPortfolio;
    }
  });
},

// make request
http.request(url, requestMaker).end();

// module export
module.exports = exportable;
