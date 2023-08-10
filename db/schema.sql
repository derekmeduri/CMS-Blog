-- drop db if exists
DROP DATABASE IF EXISTS cmsBlog_db;
-- create db
CREATE DATABASE cmsBlog_db;
-- use db
USE cmsBlog_db;
-- drop tables for user, comment, post if they exist
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS post;

-- create table for user
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR (50) NOT NULL,
    email VARCHAR (50) NOT NULL UNIQUE,
    password VARCHAR (50) NOT NULL
);

-- create table for posts
CREATE TABLE Post (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    post_title VARCHAR (240) NOT NULL,
    post_content TEXT NOT NULL,
    post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    creatd_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);


-- create table for comments
CREATE TABLE Comment (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    comment_content TEXT NOT NULL,
    comment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    creatd_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
    FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE
);