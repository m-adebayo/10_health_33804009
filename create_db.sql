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
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    meal_id INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY ux_user_meal (user_id, meal_id),

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE meals
ADD CONSTRAINT unique_meal_name UNIQUE (name);