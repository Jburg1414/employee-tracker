const mysql = require('mysql2');
const inquirer = require('inquirer');
require("dotenv").config();

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(function (err){
    if (err) throw err;
    // add execution of start function here
    menu();
});

function menu () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ["view all departments", "view all role", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
        }
]) .then((answer) => {
    switch (answer.menu) {
        case "view all departments":
            // execute view departments function
            viewDpt();
            break;
        case "view all role":
            // execute view role function
            viewRoles();
            break;
        case "view all employees":
            // execute view employees function
            viewEmp();
            break;
        case "add a department":
            // execute add departments function
            dpt();
            break;
        case "add a role":
            // execute add role function
            role();
            break;
        case "add an employee":
            // execute add employee function
            emp();
            break;
        case "update an employee role":
            // execute update employee function
            updateEmp();
            break;
    
        default:
            break;
    }
})
};

function viewDpt() {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();
    })
};

function viewRoles() {
    db.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();
    })
};

function viewEmp() {
    db.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();
    })
};

function dpt() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What department would you like to add?"
        }
    ]) .then((answer) => {
        db.query("INSERT INTO department (name) VALUES (?)", answer.name, (err, res) => {
            if (err) throw err;
            console.table(res);
            menu();
        })
    })
};

function role() {
    db.query("SELECT id, name FROM department", (err, department) => {

        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What role would you like to add?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of this role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "What is the department_id of this role?",
                choices: department.map(x => ({name: x.name, value: x.id}))
            }
            ]) .then((answer) => {
                db.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [answer.title, answer.salary, answer.department_id], (err, res) => {
                if (err) throw err;
                console.table(res);
                menu();
            });
        });
    });
};
function emp() {
    db.query("SELECT id, title FROM role", (err,role) => {
        db.query("SELECT id, last_name FROM employee", (err, manager) => {

            inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "What is the first name of the new employee?",
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the last name of the new employee?",
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "What is the role id for the new employee?",
                    choices: role.map(x => ({name: x.title, value: x.id}))
                },
                {
                    type: "list",
                    name: "manager",
                    message: "What is the manager id for the new employee?",
                    choices: manager.map(x => ({name: x.title, value: x.id}))
                }
            ]) .then((answer) => {
                db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.first_name, answer.last_name, answer.role_id, answer.manager], (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    menu();
                });
            });
        });
    });
};

function updateEmp() {
    db.query("SELECT id, first_name FROM employee", (err, employee) => {
        db.query("SELECT id, title FROM role", (err, role) => {

            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee would you like to update?",
                    choices: employee.map(x => ({name: x.first_name, value: x.id}))
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the new role for this employee",
                    choices: role.map(x => ({name: x.title, value: x.id}))
                }
            ]) .then((answer) => {
                db.query("UPDATE employee SET role_id = '?'  WHERE 'id' = '?' ", [answer.role, answer.employee], (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    menu();
                });
            });
        });
    });
};
