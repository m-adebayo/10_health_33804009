CREATE DATABASE IF NOT EXISTS health;
USE health;

CREATE TABLE IF NOT EXISTS meals (
    id  INT AUTO_INCREMENT,
    name    VARCHAR(100),
    description TEXT,
    ingredients TEXT, 
    recipe TEXT, 
    PRIMARY KEY(id)
);

GRANT ALL PRIVILEGES ON health.* TO 'health_app'@'localhost';

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    first_name  VARCHAR(50),
    last_name   VARCHAR(50),
    username    VARCHAR(50) UNIQUE,
    email       VARCHAR(100) UNIQUE,
    password    VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS ratings (
    id        INT AUTO_INCREMENT,
    user_id   INT,
    meal_id   INT,
    rating    INT CHECK (rating BETWEEN 1 AND 5),
    comment   TEXT,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (meal_id) REFERENCES meals(id)
);