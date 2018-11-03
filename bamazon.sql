/* Create database & initialize Tables */

/* DROP DATABASE IF EXISTS bamazon; */ /* Uncomment to reset */
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE Products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10),
    primary key (item_id)
);

/* Load products into  table */

INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Laptop','Electronics',499.99,20);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Desktop','Electronics',799.99,10);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Playstation 4','Electronics',399.99,25);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Xbox One','Electronics',349.99,20);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Nintendo Switch','Electronics',299.99,15);

INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Apple','Food',0.99,100);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Orange','Food',0.79,100);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Loaf of Bread','Food',1.99,30);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Can of Soup','Food',.59,40);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Steak','Food',5.99,20);

INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Toothpaste','Household',4.99,30);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Toilet Paper','Household',2.99,40);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Paper Towels','Household',3.99,35);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Dish Soap','Household',5.99,20);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Detergent','Household',7.99,15);

INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Jeans','Clothes',19.99,20);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('T-Shirt','Clothes',12.99,35);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Socks','Clothes',3.99, 50);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Shoes','Clothes',39.99, 10);
INSERT INTO Products(product_name,department_name,price,stock_quantity) VALUES ('Onesie','Clothes',7.99, 25);

/* Display table in Workbench */

SELECT * FROM Products