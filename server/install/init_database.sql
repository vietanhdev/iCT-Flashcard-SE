-- SET FOREIGN_KEY_CHECKS = 0;
-- DROP TABLE IF EXISTS users, tokens, collections, cards;
-- SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
    id INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(200) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fullname VARCHAR(200),
    bio TEXT,
    profile_photo VARCHAR(255),
    PRIMARY KEY (id),
    UNIQUE KEY (username)
) DEFAULT CHARSET = utf8;

CREATE TABLE tokens (
    id INT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    user_id INT(20) UNSIGNED NOT NULL,
    token_exp DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
) DEFAULT CHARSET = utf8;

CREATE TABLE collections (
    id INT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT(20) UNSIGNED NOT NULL,
    profile_photo VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
) DEFAULT CHARSET = utf8;

CREATE TABLE `cards` (
    `id` INT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `collection_id` INT(20) UNSIGNED NOT NULL,
    `photo` VARCHAR(255),
    `word` VARCHAR(255),
    `pronunciation` VARCHAR(255),
    `meaning` TEXT,
    `order` INT(10),
    `remember_score` INT(3),
    FOREIGN KEY (collection_id) REFERENCES collections(id)
) DEFAULT CHARSET = utf8;

INSERT INTO tokens (user_id, token, token_exp)
VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 DAY));