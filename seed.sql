INSERT INTO department (name)
VALUES ("Manager");

INSERT INTO department (name)
VALUES ("Engineer");

INSERT INTO department (name)
VALUES ("Janitor");

INSERT INTO department (name)
VALUES ("Intern");



INSERT INTO roleTable (title, salary, department_id)
VALUES ("Manager", 60000, 1); 

INSERT INTO roleTable (title, salary, department_id)
VALUES ("Engineer", 50000, 2); 

INSERT INTO roleTable (title, salary, department_id)
VALUES ("Janitor",40000, 3); 

INSERT INTO roleTable (title, salary, department_id)
VALUES ("Intern", 10000, 4); 


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Frank", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith",1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Lowes", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chuck", "Bean", 4, 1)