var connection = require('../models/database');
var dbConfig = require('../config/database');
var rl = require('readline-sync');
const importer = require('node-mysql-importer');
var response = '';
var bcrypt = require('bcrypt');
const saltRounds = 10;

console.log("*** DANGEROUS !! ***");
console.log("This script will re-create the database");
response = rl.question("Do you want to excute this script? (yes to continue): ");

if (response != "yes") {
    console.log("Aborted!");
    return;
}

importer.config(dbConfig);
 
importer.importSQL('./install/init_database.sql').then( () => {
    console.log('all statements have been executed');
    console.log('Creating admin account');

    bcrypt.hash("admin11", saltRounds, function(err, hash) {
        connection.query(`
        INSERT INTO users (username, password, email, bio, profile_photo) VALUES (?, ?, ?, ?, ?);
        `,
        [
            "admin",
            hash,
            "ictflashcard@vietanhdev.com",
            `Test
            Xin chao minh la Viet Anh
            `,
            "default-profile-photo.png"
        ],
        function(err, results){    
            if(err){
                console.log(err);
            }
            else{
                console.log('Done!');
                process.exit(0);
            }
        });
    });

}).catch( err => {
    console.log(`error: ${err}`);
});

