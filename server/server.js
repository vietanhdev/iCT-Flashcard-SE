// Get the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// Controllers
var UserController = require('./controllers/user');
var DictionaryController = require('./controllers/dictionary');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Receive request from all source
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Pass to next layer of middleware
  next();
});

// Create our Express router
var router = express.Router();

// Register all our routes with /api
app.use('/api/', router);


// ==================================================================
// USER APIs FOR DICTIONARY
/// ### E-V Dictionary
router.route('/dictionary/ev')
  .get(DictionaryController.lookup);


// ==================================================================
// USER APIs FOR USER INFO

// ### User Login
// params: {'username': '<username>', 'password', '<password>'}
// success: return {'success': true, 'token': '<token>'}
// fail: return {'success': false}
router.route('/user/login')
  .post(UserController.login);

// ### Check login state
// params: {'username': '<username>', 'token', '<token>'}
// success: return {'success': true, 'isLoggedIn': true}
// fail: return {'success': false}
router.route('/user/islogin')
  .post(UserController.checkValidLogin);

// ### Update user info
// params: {'username': '<username>', 'token', '<token>',
//          'oldPassword': '<oldPassword>'
//                'newUserInfo': {
//                      'email'        : '<email>',
//                      'bio'          : '<bio>',
//                      'fullname'     : '<fullname>',
//                      'email'        : '<email>',
//                      'newPassword'  : '<newPassword>',
//                 }
//          }
//    => 'oldPassword', 'newPassword' are used when user wants to change their password
//    => all properties of 'newUserInfo' are optional
// success: return {'success': true}
// fail: return {'success': false}
router.route('/user/updateinfo')
  .post(UserController.updateUserInfo);



// ### Start the server
// Use environment defined port or 3000
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server is listening on port: ' + port);