// Load required packages
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var connection = require('../models/database');

var UserModel = {};
UserModel.login = function(user, pass, callback) {
	// console.log("USER", user, pass);

	// Query password
	connection.query(`SELECT * FROM users WHERE username = ?;`, [user], function (error, results, fields) {

		if (error) {
			console.log(error);
			return callback({"success": false});
		}
	
		if (results.length == 0) {
			return callback({"success": false});
		}

		// Load hash from your password DB.
		bcrypt.compare(pass, results[0].password, function(err, resp) {
			if (err || resp == false) {
				return callback({"success": false});
			} else { // Check login info: ok

				// => gen new token
				crypto.randomBytes(20, function(err, buffer) {
					let token = buffer.toString('hex');

					// Update token to database
					let query = connection.query(`INSERT INTO tokens (user_id, token, token_exp) VALUES
					(?, ?, DATE_ADD(NOW(), INTERVAL 1 DAY));`,
					[results[0].id,
					token], function(err, resp){

						if (err) {
							return callback({"success": false});
						}

						// Send token to client
						return callback({"success": true, "token": token});
					});

				});

			}					

		});
	});
};

UserModel.checkValidLogin = function(user, token, callback) {
	// Query password
	connection.query(`SELECT * FROM users
		INNER JOIN tokens ON users.id = tokens.user_id
		WHERE users.username = ?
		AND tokens.token = ?
		AND tokens.token_exp > NOW()
		`, [user, token], function (error, results) {

			if (error) {
				console.log(error);
				return callback({"success": false});
			}
		
			if (results.length == 0) {
				return callback(
					{
						"success": true,
						"isLoggedIn": false
					}
				);
			} else {
				return callback(
					{
						"success": true,
						"isLoggedIn": true
					}
				);
			}
		
	});
};


UserModel.isAvailableUsername = function(username, callback) {
	connection.query(`SELECT * FROM users
		WHERE username = ?
		`, [username], function (error, results) {

			if (error) {
				console.log(error);
				return callback(false);
			}
		
			if (results.length == 0) {
				return callback(false);
			} else {
				return callback(true);
			}
		
	});
};


UserModel.register = function(registerInfo, callback) {
	connection.query(`INSERT INTO users (username, password, email) 
	VALUES (?, ?, ?)
	`, [registerInfo.username, registerInfo.password, registerInfo.email], function (error, results) {

		if (error) {
			console.log(error);
			return callback({"success": false});
		}
	
		return callback({"success": true});
	
	});
};


UserModel.updateUserInfo = function(username, newUserInfo, callback) {

	let updateQueryArr = [];
	let newValuesArr = [];

	if (newUserInfo.hasOwnProperty("email")) {
		updateQuery.push(" email = ? ");
		newValuesArr.push(newUserInfo["email"]);
	}

	if (newUserInfo.hasOwnProperty("fullname")) {
		updateQuery.push(" fullname = ? ");
		newValuesArr.push(newUserInfo["fullname"]);
	}

	if (newUserInfo.hasOwnProperty("bio")) {
		updateQuery.push(" bio = ? ");
		newValuesArr.push(newUserInfo["bio"]);
	}


	if (newValuesArr.length == 0) {
		return callback({"success": true});
	}

	// Push username to use in query
	newValuesArr.push(username);

	// Update info
	connection.query(`ALTER TABLE users
		SET ` + updateQueryArr.join(' , ') + `
		WHERE username = ?
		`, newValuesArr, function (error) {
		if (error) {
			return callback({"success": false});
		} else {
			return callback({"success": true});
		}
	});
}

module.exports = UserModel;