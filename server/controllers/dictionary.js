// Load required packages
var DictionaryModel = require('../models/dictionary');

var DictionaryController = {};

/// ### E-V Dictionary
DictionaryController.lookup = function(req, res) {

    let lookUpWord = req.query['lookup'];
    let result = {};
  
    if (lookUpWord === undefined) {
      result['success'] = false;
      result['message'] = "Vui lòng nhập từ để thực hiện tra cứu.";
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result));
    } else {
  
      // Decode lookup word
      lookUpWord = decodeURIComponent(lookUpWord);

      DictionaryModel.lookup(lookUpWord, function(result) {
        res.json(result);
      });

    }  

}


module.exports = DictionaryController;