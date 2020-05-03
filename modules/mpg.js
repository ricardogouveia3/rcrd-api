const ptBRdic = require('./../data/words_br.json');
const enUSdic = require('./../data/words_en.json');

const mpgModule = {
  hundredRandom: (dic) => {
    const selectedDic = dic === 'en' ? enUSdic : ptBRdic;
    const numberSelected = 100;
    let selectedWords = [];

    while (selectedWords.length < numberSelected) {
      let word = selectedDic[Math.floor(Math.random() * selectedDic.length)];

      if (!selectedWords.includes(word)) {
        selectedWords.push(word);
      }
    }

    selectedWords.sort();
    return selectedWords;
  }
}

module.exports = mpgModule;