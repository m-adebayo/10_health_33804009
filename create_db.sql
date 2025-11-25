CREATE DATABASE IF NOT EXISTS health;
USE health

CREATE TABLE IF NOT EXISTS meals (
    id  INT AUTO_INCREMENT,
    name    VARCHAR(100),
    description TEXT,
    ingredients TEXT, 
    recipe TEXT, 
    PRIMARY KEY(id)
);

GRANT ALL PRIVILEGES ON health.* TO ' health_app'@'localhost';