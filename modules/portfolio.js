// main variables and requires
const https = require('https');
const backupPortfolio = require('./../data/backup_portfolio.json');

const exportable = {
  status: {
    fromBackup: false,
    error: "",
  },
  data: {}
};


// request to google spreadsheets
const sheetyApiUrl = "https://api.sheety.co/e65e4144b92f13f5ed263fb790fc0559/rcrdPortfolio/prod";

// prepare request and return data
requestMaker = (response) => {
  let data = [];

  response.on('data', (newData) => {
    data += newData;
  });

  response.on('error', (error) => {
    useBackupData(error);
   });

  response.on('end', () => {
    try {
      data = JSON.parse(data);

      if (data.errors) {
        const error = { message: data.errors[0].detail };
        useBackupData(error);
      } else {
        exportable.data = data.prod;
      }
    } catch (error) {
      useBackupData(error);
    }
  });

  useBackupData = (error) => {
    exportable.status.fromBackup = true;
    exportable.status.error = error.message;
    exportable.data = backupPortfolio;
  };
},

// make request
https.request(sheetyApiUrl, requestMaker).end();

// module export
module.exports = exportable;
