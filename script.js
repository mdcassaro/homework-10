var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "employee_tracker_DB_password",
    database: "employee_tracker_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });

  function runSearch() {
    inquirer
      .prompt({
        name: "search",
        type: "rawlist",
        message: "What would you like to view?",
        choices: [
          "Find departments?",
          "Find roles?",
          "Find employees?",
          
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Find departments?":
          departmentSearch();
          break;
  
        case "Find roles?":
          roleSearch();
          break;
  
        case "Find employees?":
          employeeSearch();
          
        }
      });
  }


  function departmentSearch() {
    inquirer
      .prompt({
        name: "department",
        type: "input",
        message: "What department would you like to search for?"
      })
      .then(function(answer) {
        var query = "SELECT id FROM department WHERE ?";
        connection.query(query, { name: answer.name }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + res[i].name);
          }
          runSearch();
        });
      });
  }

  function roleSearch() {
    inquirer
      .prompt({
        name: "role",
        type: "input",
        message: "What role would you like to search for?"
      })
      .then(function(answer) {
        var query = "SELECT id, salary, department_id FROM roleTable WHERE ?";
        connection.query(query, { title: answer.title }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + res[i].title);
          }
          runSearch();
        });
      });
  }

  function employeeSearch() {
    inquirer
      .prompt({
        name: "role",
        type: "input",
        message: "Search for Employee by I.D.?"
      })
      .then(function(answer) {
        var query = "SELECT first_name, last_name, role_id, manager_id FROM employee WHERE ?";
        connection.query(query, { id: answer.id }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("ID: " +res[i].id);
          }
          runSearch();
        });
      });
  }

