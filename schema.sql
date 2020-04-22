DROP DATABASE IF EXISTS employee_tracker_DB;
CREATE database employee_tracker_DB;

USE employee_tracker_DB;


CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roleTable (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(30,2),
    dapartment_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
)