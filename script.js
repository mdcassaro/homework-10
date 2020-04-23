var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
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
          "Enter a new Employee?",
          "Enter a new Role?",
          "Enter a new Department?"
          
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
            addEmployee();
        }else if(answer.search === "Enter a new Role?") {
            addRole();
        }else if(answer.search === "Enter a new Department?") {
            addDepartment();
        }
        
        else{
            connection.end();
        }
      });
  
  }


  function departmentSearch(){
      connection.query("SELECT * FROM department;", function(err, res){
          if (err) throw err
          for (var i = 0; i < res.length; i++) {
            console.log("I.D.: " + res[i].id + " || Department: " + res[i].name);
          }
      })
  }

  
  function roleSearch(){
    connection.query("SELECT * FROM roleTable;", function(err, res){
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
          console.log("I.D.: " + res[i].id + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || Department I.D.: " + res[i].department_id);
        }
    })
}

function employeeSearch(){
    connection.query("SELECT * FROM employee;", function(err, res){
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
          console.log("I.D.: " + res[i].id + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || Manager I.D.: " + res[i].manager_id);
        }
    })
}



//   

  


  function addEmployee(){
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
            message: "What is the new employees role I.D.?"
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
                 role_id: answer.employeeRole,
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

  function addDepartment(){
    inquirer
    .prompt([
        {
           name: "departmentName",
           type: "input",
           message: "What is the new department name?"
       },
      
        
    ])
    .then (function(answer){
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.departmentName,
                
            },
            function(err) {
               if (err) throw err;
               console.log("Your department was created successfully!");
               // re-prompt the user for if they want to bid or post
               

            }
        )
    })

   

 }

 
 function addRole(){
    inquirer
    .prompt([
        {
           name: "roleTitle",
           type: "input",
           message: "What is the title of the new role?"
       },
       {
           name: "roleSalary",
           type: "input",
           message: "What is the salary of the new role?"
       },
       {
           name: "RoleDepartmentId",
           type: "input",
           message: "What is the  I.D. og the new role?"
       },
     
        
    ])
    .then (function(answer){
        connection.query(
            "INSERT INTO roleTable SET ?",
            {
                title: answer.roleTitle,
                salary: answer.roleSalary,
                department_id: answer.RoleDepartmentId,
                
            },
            function(err) {
               if (err) throw err;
               console.log("Your role was created successfully!");
               // re-prompt the user for if they want to bid or post
               

            }
        )
    })

   

 }
