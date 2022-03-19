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
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
        }
]) .then((answer) => {
    switch (answer.menu) {
        case "view all departments":
            // execute view departments function
            viewDpt();
            break;
        case "view all roles":
            // execute view departments function
            viewRoles();
            break;
        case "view all employees":
            // execute view departments function
            viewEmp();
            break;
        case "add a department":
            // execute view departments function
            dpt();
            break;
        case "add a role":
            // execute view departments function
            role();
            break;
        case "add an employee":
            // execute view departments function
            emp();
            break;
        case "update an employee role":
            // execute view departments function
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
    db.query("select id, name from department", (err, department) => {

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
    inquirer.prompt([
        {
            type: "input",
            name: "employee",
            message: "Who would you like to add?"
        }
    ]) .then((answer) => {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", answer.role, (err, res) => {
            if (err) throw err;
            console.table(res);
            menu();
        })
    })
};


