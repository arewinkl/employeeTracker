DROP DATABASE IF EXISTS product_db;

CREATE DATABASE product_db;

USE product_db;

CREATE TABLE items (
    itemName VARCHAR(30),
    curBid INT,
    bidName VARCHAR(30)
);

INSERT INTO items (itemName, curBid, bidName) 
VALUES ("Space pen", 5, "Devon");

INSERT INTO items (itemName, curBid, bidName) 
VALUES ("Mug", 500, "Nora");

INSERT INTO items (itemName, curBid, bidName) 
VALUES ("Octopus", 501, "Beni");


-- table for employees
CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INTEGER NULL,
  manager_id INTEGER NULL,
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 245321, 448821);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane","Doe", 2457321, 448821);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sav", "Marie", 12214648, 448821);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Carry", 3447112, 4332216);


-- table for the roles.
CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO roles (title, salary, department_id)
VALUES ("receptionist",  30000.00, 78691);

INSERT INTO roles (title, salary, department_id)
VALUES ("sales associate",  45000.20, 98236);

INSERT INTO roles (title, salary, department_id)
VALUES ("accountant",  55000.45, 56798);


-- table for the department.
CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  dept VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (dept)
VALUES ("sales");

INSERT INTO department (dept)
VALUES ("accounting");

INSERT INTO department (dept)
VALUES ("legal");