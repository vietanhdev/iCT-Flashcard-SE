const evDict = require('./dict_data.json');

var DictionaryModel = {};
DictionaryModel.lookup = function(word, callback) {
  let result = {};

	// Look up in database
  let found = false;
  for (let i = 0; i < evDict.length; i++) {
    if (evDict[i].word.toLocaleLowerCase() === word.toLocaleLowerCase()) {
      result['success'] = true;
      result['word'] = word;
      result['ipapron'] = evDict[i].ipapron;
      result['meaning'] = evDict[i].meaning;

      return callback(result);
      found = true;
      break;
    }
  }

  // If not found a word
  if (!found) {
    result['success'] = false;
    result['word'] = word;
    result['message'] = "Không tìm thấy từ bạn yêu cầu.";
    return callback(result);
  }
};

module.exports = DictionaryModel;