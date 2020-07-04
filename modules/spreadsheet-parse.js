// main variables and requires
const exportable = {
  // parse spreadsheet data into array - ignores last line for some reason
  parseSpreadsheetJsonIntoArray: function(spreadsheetJson) {
    let rowNumber = '1';
    const rootArray = [];
    let entryArray = [];

    for (const entry of spreadsheetJson.feed.entry) {
      // get row number
      const jsonRowNumber = entry['gs$cell']['row'];

      // if working on new line
      if (jsonRowNumber !== rowNumber) {
        rootArray.push(entryArray);
        rowNumber = jsonRowNumber;
        entryArray = [];
        entryArray.push(entry.content['$t']);
      } else {
        // working on same line
        entryArray.push(entry.content['$t']);
      }
    }

    return rootArray;
  },

  // parse spreadsheet object
  portfolioObjectCreator: function(spreadParsedArray) {
    const portfolioArray = [];

    // for each singlearray, create a portfolio object
    for (const singleArray of spreadParsedArray) {
      const portfolioObject = {
        title:          singleArray[0] ? singleArray[0] : undefined,
        link:           singleArray[1] ? singleArray[1] : undefined,
        date:           singleArray[2] ? singleArray[2] : undefined,
        type:           singleArray[3] ? singleArray[3] : undefined,
        typeColor:      singleArray[4] ? singleArray[4] : undefined,
        bgColor:        singleArray[5] ? singleArray[5] : undefined,
        cardImg64:      singleArray[6] ? singleArray[6] : undefined,
        portfolioImg64: singleArray[7] ? singleArray[7] : undefined,
      }
      
      portfolioArray.push(portfolioObject);
    }

    return portfolioArray;
  },

  labsObjectCreator: function(spreadParsedArray) {
    const labsArray = [];

    // for each singlearray, create a labs object
    for (const singleArray of spreadParsedArray) {
      const labsObject = {
        title:        singleArray[0] ? singleArray[0] : undefined,
        color:        singleArray[1] ? singleArray[1] : undefined,
        link:         singleArray[2] ? singleArray[2] : undefined,
        description:  singleArray[3] ? singleArray[3] : undefined,
        image:        singleArray[4] ? singleArray[4] : undefined,
      }
      
      labsArray.push(labsObject);
    }

    return labsArray;
  }
};

// module export
module.exports = exportable;
