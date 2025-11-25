CREATE DATABASE IF NOT EXISTS fresh_forks;
USE fresh_forks

CREATE TABLE IF NOT EXISTS meals (
    id  INT AUTO_INCREMENT,
    name    VARCHAR(100),
    description TEXT,
    ingredients TEXT, 
    recipe TEXT, 
    PRIMARY KEY(id)
);
