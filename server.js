const mysql = require("mysql2");
const inquirer = require("inquirer");
const { createConnection } = require("mysql2");
require("console.table");

// Connecting mysql
const connection = mysql/createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    console.log()

    init();
});

// Function to initialize app
function init() {
    inquirer.prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    })
    .then(function ({task}) {
        console.log("You chose to: " + result.task);

        switch (result.task) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            default:
                quit();
                break;
        }
    });
}

// Function to view employees
function viewAllEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}

// Function to add employee
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "eeFirstName"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "eeLastName"
        },
        {
            type: "input",
            message: "What is the employee's role",
            name: "roleID"
        },
        {
            type: "input",
            message: "What is the manager's ID number",
            name: "managerID"
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", 
        [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], 
        function(err, res) {
            if (err) throw err;
            console.table(res);
            init();
        });
    });
}

// Function to update employee roles
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which employee would you like to update?",
            name: "eeUpdate"
        },
        {
            type: "input",
            message: "What would you like to update to?",
            name: "updateRole"
        }
    ])
    .then(function(answer) {
        connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [answer.updateRole, answer.eeUpdate], 
        function(err, res) {
            if (err) throw err;
            console.table(res);
            init();
        });
    });
}

// Function to view all roles
function viewAllRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, 
        function(err, res) {
            if (err) throw err;
            console.table(res);
            init()
        });
}

// Function to add roles
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to add?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salaryTotal"
        },
        {
            type: "input",
            message: "What is the department ID number",
            name: "departmentID"
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.departmentID],
        function(err, res) {
            if (err) throw err;
            console.table(res);
            init();
        });
    });
}