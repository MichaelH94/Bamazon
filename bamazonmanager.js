const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password", 
    database: "Bamazon"
});

function managerView() {
    inquirer.prompt([
        {  
            name: "manager",
            type: "rawlist",
            message: "Choose what you want to do.",
            choices: [
                "View Products",
                "View Low Inventory",
                "Add To Inventory",
                "Add New Product"
            ] 
        }
    ]).then(function(answers) {
        switch(answers.manager) {
            case 'View Products':
            displayInventory();
            break;

            case 'View Low Inventory':
            lowInv();
            break;

            case 'Add To Inventory':
            addInventory();
            break;

            case 'Add New Product':
            addProduct();
            break;
        }
    });
}

function displayInventory() {
    connection.query('SELECT * FROM Products', function(err, res) {
        if(err) throw err;

        var displayProducts = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price in $', '# In Stock'],
            colWidths: [10, 20, 16, 14, 16]
        });

        for(x = 0; x < res.length; x++) {
            displayProducts.push(
                [res[x].item_id, res[x].product_name, res[x].department_name, res[x].price, res[x].stock_quantity]
            )
        };
        
        console.log(displayProducts.toString());
        repeater();
    });
}


function lowInv() {
    connection.query('SELECT * FROM Products WHERE stock_quantity < 5', function(err, res) {
        if(err) throw err;

        var lowTable = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price in $', '# In Stock'],
            colWidths: [10, 20, 16, 14, 16]
        });

        for(x = 0; x < res.length; x++) {
            lowTable.push(
                [res[x].item_id, res[x].product_name, res[x].department_name, res[x].price, res[x].stock_quantity]
            )
        };
        
        console.log(lowTable.toString());
        repeater();
    });
}

function addInventory() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Enter the ID of the item you wish to restock."
        },
        {
            name: "qty",
            type: "input",
            message: "How many would you like to restock?"
        }
    ]).then(function(answers) {
        connection.query('SELECT * FROM Products WHERE item_id = ' + answers.item, function(err, res) {
            if (err) throw err;
            connection.query('UPDATE Products SET stock_quantity = stock_quantity + ' + answers.qty + ' WHERE item_id = ' + answers.item);
            console.log("Got it, we sent in an order for " + answers.qty + " " + res[0].product_name + "(s).")
            repeater();
        });
    });
}


function addProduct() {
    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "Enter name of the product you wish to add."
        }, 
        {
            name: "department",
            type: "input", 
            message: "Enter department name."
        }, 
        {
            name: "price",
            type: "input",
            message: "Enter the price of the product."
        },
        {
            name: "qty",
            type: "input",
            message: "Enter the amount of product you wish to stock."
        }
    ]).then(function(answers) {
        var prod = answers.product;
        var depart = answers.department;
        var productPrice = answers.price;
        var orderQty = answers.qty;
        
        connection.query('INSERT INTO Products (product_name,department_name,price,stock_quantity) VALUES ("' + prod + '","' + depart + '",' + productPrice + ',' + orderQty + ')');
        console.log("Added " + orderQty + " " + prod + "(s) to the Bamazon inventory");
        repeater();
    })
}


function repeater() {
    inquirer.prompt([
        {
            name: "repeat",
            type: "rawlist",
            message: "Continue Manager functions?",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(function(answers) {
        if(answers.repeat == "Yes") {
            managerView();   
        } else {
            process.exit();
        }
    })
}

managerView();