// Load required packages
var UserModel = require('../models/user');

var UserController = {};

// ### User Login
UserController.login = function(req, res) {

  if (!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password")) {
    return res.json({"success": false});
  }

  console.log(req.body.username, req.body.password);
  UserModel.login(req.body.username, req.body.password, function(resp) {
    res.json(resp);
  });

}

// ### User Register
UserController.register = function(req, res) {

  if (!req.body.hasOwnProperty("username")
    || !req.body.hasOwnProperty("password")
    || !req.body.hasOwnProperty("email")) {
    return res.json({"success": false,
      "message": "Vui lòng nhập tất cả các ô được yêu cầu!"
    });
  }

  // Check valid for password
  if (req.body.password.length == 0
    ||  /\s/g.test(req.body.password))
  {
    return res.json({"success": false,
      "message": "Mật khẩu không được chứa dấu cách và không được bỏ trống!"
    });
  }

  // Check valid for username
  let lettersRegex = /^[0-9a-zA-Z]+$/;
  if(!req.body.password.match(lettersRegex)) {
    return res.json({"success": false,
      "message": "Tên đăng nhập chỉ được chứa các kí tự chữ cái a-z hoặc số 0-9!"
    });
  } else {
    UserModel.isAvailableUsername(req.body.username, function(isValidUsername){
      if (isValidUsername) {
        UserModel.register(req.body, function(resp) {
          res.json(resp);
        });
      } else {
        return res.json({"success": false,
          "message": "Tên đăng nhập đã được sử dụng. Vui lòng chọn tên khác."
        });
      }
    });
  }

}


// ### Check login state
UserController.checkValidLogin = function(req, res) {

  if (!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("token")) {
    return res.json({"success": false});
  }

  UserModel.checkValidLogin(req.body.username, req.body.token, function(resp) {
    res.json(resp);
  });

}

// ### Update user info
UserController.updateUserInfo = function(req, res) {

  if (!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("token")
    || !req.body.hasOwnProperty("newUserInfo")
  ) {
    return res.json({"success": false});
  }

  UserModel.checkValidLogin(req.body.username, req.body.token, function(resp) {
      if (resp["success"] == false || resp["isLoggedIn"] == false ) {
        res.json({"success": false});
      } else {
        UserModel.updateUserInfo(req["username"], req["newUserInfo"], function(resp) {
          res.json(resp);
        });
      }
  });

}

module.exports = UserController;