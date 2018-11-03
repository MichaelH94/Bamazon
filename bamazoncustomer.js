
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

function bamazon() {
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
        
        inquirer.prompt([
            {  
                name: "item",
                type: "input",
                message: "Pick an item by ID to purchase." 
            }, 
            {
                name: "qty",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ]).then(function(answers) {
            var itemid = answers.item;
            var quantity = answers.qty;

            purchase(itemid, quantity);
        
        });
    });

}

function purchase(itemid, quantity) {
    connection.query('SELECT * FROM Products WHERE item_id = ' + itemid, function(err, res) {
        if (err) {
            throw err;
        }

        if (res[0].stock_quantity >= quantity) {
            var cost = res[0].price * quantity; 
            console.log("------------------------------------------------------------")
            console.log("Thank you for choosing Bamazon! Your total today will be: $" + cost);

                if(res[0].department_name == "Food") {
                console.log("We hope you enjoy your " + res[0].product_name +  "."); 
                console.log("Food orders will be delivered by the next business day if ordered before 3:00 PM.");
                } else {
                    console.log("We hope you enjoy your " + res[0].product_name +  ".");
                    console.log("Please allow 2-3 business days for delivery of your product.");
                };
            console.log("------------------------------------------------------------");
            connection.query('UPDATE Products SET stock_quantity = stock_quantity - ' + quantity + ' WHERE item_id = ' +  itemid)
        } else {
            console.log("We currently don't have enough in stock. Check back soon."); 
        };

        inquirer.prompt([
            {
                name: "repeat",
                type: "rawlist",
                message: "Shop Again?",
                choices: [
                    "Yes",
                    "No"
                ]
            }
        ]).then(function(answers) {
            if(answers.repeat == "Yes") {
             bamazon();   
            } else {
                console.log("Thank you for choosing Bamazon!")
                process.exit();
            }
        })
    });
}

bamazon();