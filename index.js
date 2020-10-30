var mysql = require("mysql");
const config = require("./config.json");


const connection = mysql.createConnection(config);

let userName;

var inquirer = require("inquirer");

function inputUsername() {
    inquirer.prompt([
        {
            message: "What is your  businesses name?",
            name: "userName"
        }
    ]).then(res => {
        userName = res.userName;
        showCurBids();
    })
}

function showCurBids() {
    connection.query("SELECT * FROM items WHERE bidName=?", [userName], function (err, res) {
        if (err) throw err;
        if (res.length > 0) {
            res.forEach(item => console.log(`You have a high bid on ${item.itemName} of ${item.curBid}.`))
            home();
        } else {
            console.log("You don't have any high bids at the moment.")
            home();
        }
    });
}

function employee() {
    inquirer.prompt([
        {
            message: "What is their first name ?",
            name: "first_name"
        },
        {
            message: "What is the their last name?",
            name: "last_name"
        },
        {
            message: "What is their role id?",
            name: "role_id"
        },
        {
            message: "What is their managers id?",
            name: "manager_id"
        }
    ]).then(res => {
        var query = connection.query("INSERT INTO items SET ?", {
            first_name: res.first_name,
            last_name: res.last_name,
            role_id: res.role_id,
            manager_id: res.manager_id
        }, (err, result) => {
            if (err) throw err;
            console.log("Employee added.");
            home();
        });
    });
}

function roles() {
    inquirer.prompt([
        {
            message: "What is their role title ?",
            name: "title"
        },
        {
            message: "What is the their salary ?",
            name: "salary"
        },
        {
            message: "What is their department id?",
            name: "department_id"
        }
        
    ]).then(res => {
        var query = connection.query("INSERT INTO items SET ?", {
            title: res.title,
            salary: res.salary,
            department_id: res.department_id
        }, (err, result) => {
            if (err) throw err;
            console.log("Employee roles added.");
            home();
        });
    });
}

function department() {
    inquirer.prompt([
        {
            message: "What is their items name ?",
            name: "dept"
        }
       
        
    ]).then(res => {
        var query = connection.query("INSERT INTO department SET ?", {
            dept: res.dept
        }, (err, result) => {
            if (err) throw err;
            console.log("Employee roles added.");
            home();
        });
    });
}

function checkBid(item, bidNum) {
    connection.query("SELECT * FROM items WHERE itemName=?", [item], function (err, res) {
        if (err) throw err;
        const oldName = res[0].bidName;
        if (bidNum > res[0].curBid) {
            var query = connection.query("UPDATE items SET ? WHERE ?", [
                {
                    curBid: bidNum
                },
                {
                    itemName: item
                }
            ], (err, res) => {
                if (err) throw err;
                console.log("Your bid is success. You have overtaken " + oldName + ".");
                var query2 = connection.query("UPDATE items SET ? WHERE ?",[
                    {
                        bidName: userName
                    },
                    {
                        itemName: item
                    }
                ], (err, res) => {
                    if (err) throw err;
                });
                home();
            });
        } else {
            console.log("Your bid is fail. " + oldName + " bid higher.");
            home();
        }
    });
}

function makeBid () {
    connection.query("SELECT * FROM items", function (err, res) {
        if (err) throw err;
        let choices = [];
        res.forEach(item => choices.push(item.itemName));
        inquirer.prompt([
            {
                type: "list",
                message: "Which item would you like to bid on?",
                choices: choices,
                name: "itemChoice"
            },
            {
                message: "What is your bid?",
                name: "bidNum"
            }
        ]).then(res => {
            checkBid(res.itemChoice, res.bidNum);
        })
    });
}

function home() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Add employees", "Specify roles", "Add department"],
            name: "choice"
        }
    ]).then(res => {
        if (res.choice === "Add employees") {
            employee();
        } if (res.choice === "Specify roles") {
            roles();
        } else {
            department();
        }
    })
}


connection.connect(err => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
})

function afterConnection() {
    connection.query("SELECT * FROM items", function (err, res) {
        if (err) throw err;
        inputUsername();
        // connection.end();
    });
}