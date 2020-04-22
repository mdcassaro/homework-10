var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "515Blank",
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
          "See departments?",
          "See roles?",
          "See employees?",
          "Enter a new Employee?"
          
        ]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.search === "See departments?") {
            departmentSearch();
        }
        else if(answer.search === "See roles?") {
            roleSearch();
        } else if(answer.search === "See employees?") {
            employeeSearch();
        }else if(answer.search === "Enter a new Employee?") {
            propmtNewEmployee();
        }else{
            connection.end();
        }
      });
  
  }


  function departmentSearch(){
      connection.query("SELECT * FROM department;", function(err, res){
          if (err) throw err
          for (var i = 0; i < res.length; i++) {
            console.log("Department: " + res[i].id + " || Department: " + res[i].name);
          }
      })
  }



//   function departmentSearch() {
//     inquirer
//       .prompt({
//         name: "department",
//         type: "input",
//         message: "What department would you like to search for by I.D.?"
//       })
//       .then(function(answer) {
//         var query = "SELECT name FROM department WHERE ?";
//         connection.query(query, { id: answer.id }, function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log("ID: " + res[i].id + res[i].name);
//           }
//           runSearch();
//         });
//       });
//   }

  function roleSearch() {
    inquirer
      .prompt({
        name: "role",
        type: "input",
        message: "What role would you like to search for by I.D.?"
      })
      .then(function(answer) {
        var query = "SELECT title, salary, department_id FROM roleTable WHERE ?";
        connection.query(query, { id: answer.id }, function(err, res) {
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

  function propmtNewEmployee(){
      inquirer
      .prompt({
          name: "newEmployee",
          type: "list",
          message: "Would you like to add a new employee?",
          choices: ["Yes", "No"]

      })
      if(answer.newEmployee === "Yes"){
          addEmployee()
      }else{
          connection.end()
      }

  }


  function addEmployee(answer){
     inquirer
     .prompt([
         {
            name: "employeeFirstName",
            type: "input",
            message: "What is the new Employees First Name?"
        },
        {
            name: "employeeLastName",
            type: "input",
            message: "What is the new Employees last name?"
        },
        {
            name: "employeeRole",
            type: "input",
            message: "What is the new employees role?"
        },
        {
            name: "employeeManagerId",
            type: "Input",
            message:" What is the I.D.of tfro the Manager of the new employee ?"
        }
         
     ])
     .then (function(answer){
         connection.query(
             "INSERT INTO employee SET ?",
             {
                 first_name: answer.employeeFirstName,
                 last_name: answer.employeeLastName,
                 role: answer.employeeRole,
                 manager_id: answer.employeeManagerId
             },
             function(err) {
                if (err) throw err;
                console.log("Your employee was created successfully!");
                // re-prompt the user for if they want to bid or post
                

             }
         )
     })

    

  }