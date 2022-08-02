// main variables and requires
const http = require('http');
const backupLabs = require('./../data/backup_labs.json');

const exportable = {
  data: {}
};

// Modules
const spreadsheetParse = require('./spreadsheet-parse');

// request to google spreadsheets
const url = {
  host: 'spreadsheets.google.com',
  path: '/feeds/cells/1mrRoJeyxxZI0PNQpIdyI7ertijLFt-A_VL32g52kR9w/1/public/full?alt=json'
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
      const labsFormatedData = spreadsheetParse.labsObjectCreator(arrayFormatedData);
  
      exportable.data = labsFormatedData;
    } catch (error) {
      exportable.data = backupLabs;
    }
  });
},

// make request
http.request(url, requestMaker).end();

// module export
module.exports = exportable;
