// main variables and requires
const https = require('https');
const backupLabs = require('./../data/backup_labs.json');

const exportable = {
  status: {
    fromBackup: false,
    error: "",
  },
  data: {}
};

// request to google spreadsheets
const sheetyApiUrl = "https://api.sheety.co/e65e4144b92f13f5ed263fb790fc0559/rcrdLabs/prod";

// prepare request and return data
requestMaker = function(response) {
  let data = '';

  response.on('data', function (newData) {
    data += newData;
  });

  response.on('error', function(error){
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

  useBackupData = function (error) {
    exportable.status.fromBackup = true;
    exportable.status.error = error.message;
    exportable.data = backupLabs;
  };
},

// make request
https.request(sheetyApiUrl, requestMaker).end();

// module export
module.exports = exportable;
