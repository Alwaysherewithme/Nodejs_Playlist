'use strict'

var mysql = require('mysql')

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
})

/**
 * Create Connection
 */
connection.connect((err) => {
    if(err) {
        console.log('[query] - :'+ err)
        return
    }
    //if(err) throw err
    console.log('[connection connects] succeed!')
})

connection.connect((err) => {
    if(err) throw err
    console.log('Connected!')
    let createDBSQL = "CREATE DATABASE wmz"

    /**
     * Create Database
     */
    connection.query(createDBSQL, (err, res) => {
        if(err) throw err
        console.log("Database created!")
        console.log('Result: ' + res)    // Result: [object Object]
    })
})

var connectionWithDB = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'wmz'
})

connectionWithDB.connect((err) => {
    if (err) throw err
    console.log("Connected!")
    // let createTableSQL = "DROP TABLE customers; CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))"    // Wrong!
    // let createTableSQL = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))"
    let createTableSQL = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))"
    // let createTableSQL = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY"
    connectionWithDB.query(createTableSQL, (err, result) => {
        if (err) throw err
        console.log("Table created")
    })
})

connectionWithDB.connect((err) => {
    if (err) throw err
    console.log('Connected!')
    
    // Insert One Record
    var insertOneSQL = "INSERT INTO wmz.customers (name, address) VALUES ('Company Inc', 'Highway 37')"
    connectionWithDB.query(insertOneSQL, (err, result) => {
        if (err) throw err
        // Get Inserted ID: for tables with an auto increment id field, only one row can be inserted!
        console.log('1 record inserted, ID: ' + result.insertId)
    })
    
    // Insert Multiple Records
    var insertManySQL = "INSERT INTO customers (name, address) VALUES ?"
    var values = [
        ['John', 'Highway 71'],
        ['Peter', 'Lowstreet 4'],
        ['Amy', 'Apple ST 652'],
        ['Hannah', 'Mountain 21'],
        ['Michael', 'Valley 345']
    ]
    connectionWithDB.query(insertManySQL, [values], (err, result) => {
        if (err) throw err
        console.log("Number of records inserted: " + result.affectedRows)
        /* The Result Object:
        {
          fieldCount: 0,
          affectedRows: 14,
          insertId: 0,
          serverStatus: 2,
          warningCount: 0,
          message: '\'Records:14  Duplicated: 0  Warnings: 0',
          protocol41: true,
          changedRows: 0
        }
        */
    })

    // Select From a Table
    //connectionWithDB.query("SELECT * FROM customers", (err, result, fields) => {
    connectionWithDB.query("SELECT name, address FROM customers", (err, result, fields) => {
        if (err) throw err

        // The Result Object
        console.log(result)    // [{ name: 'Ben', address: 'Park Lane 38'}, ... ]
        console.log(result[2].address)

        // The Fields Object
        console.log(fields)
        console.log(fields[1].name)
    })

    // Select With a Filter
    connectionWithDB.query("SELECT * FROM customers WHERE address = 'Park Lane 38'", (err, result) => {
        if (err) throw err
        console.log(result)
    })

    // Wildcard("%") Characters
    connectionWithDB.query("SELECT * FROM customers WHERE address LIKE 'S%'", (err, result) => {
        if (err) throw err
        console.log(result)
    })

	// Sort the Result(Ascending is default)
    connectionWithDB.query("SELECT * FROM customers ORDER BY name DESC", (err, result) => {   // alphabetically descend/ascend
        if (err) throw err
        console.log(result)
    })

    /**
     * Escaping Query Values
     * 
     * When query values are variables provided by the user, you should escape the values.
     * This is to prevent SQL injections, which is a common web hacking technique to destroy or misuse your database.
     */
    var adr = 'Mountain 21'
    var sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr)
	connectionWithDB.query(sql, (err, result) => {
		if (err) throw err
		console.log(result)
	})

	var adr = 'Mountain 21'
	var sql = 'SELECT * FROM customers WHERE address = ?'
	connection.query(sql, [adr], (err, result) => {
		if (err) throw err
		console.log(result)
	})

	var name = 'Amy'
	var adr = 'Mountain 21'
	var sql = 'SELECT * FROM customers WHERE name = ? OR address = ?'
	connection.query(sql, [name, adr], (err, result) => {
		if (err) throw err
		console.log(result)
	})

    /**
     * Join Two or More Tables(INNER JOIN/LEFT JOIN/RIGHT JOIN)
     * 
     * users:
     * [
            { id: 1, name: 'John', favorite_product: 154},
            { id: 2, name: 'Peter', favorite_product: 154},
            { id: 3, name: 'Amy', favorite_product: 155},
            { id: 4, name: 'Hannah', favorite_product:},
            { id: 5, name: 'Michael', favorite_product:}
        ]

        products:
        [
            { id: 154, name: 'Chocolate Heaven' },
            { id: 155, name: 'Tasty Lemons' },
            { id: 156, name: 'Vanilla Dreams' }
        ]
     */
	var sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id"
  	con.query(sql, (err, result) => {
    	if (err) throw err
    	console.log(result)
  	})

	// Limit the Result
	// var sql = "SELECT * FROM customers LIMIT 5"
	var sql = "SELECT * FROM customers LIMIT 5 OFFSET 2"   // "OFFSET 2", means starting from the 3rd position!
	// var sql = "SELECT * FROM customers LIMIT 2, 5"   // The numbers are reversed: "LIMIT 2, 5" is the same as "LIMIT 5 OFFSET 2"
  	con.query(sql, (err, result) => {
    	if (err) throw err
    	console.log(result)
  	})
	
	// Update Table
	var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
  	connection.query(sql, (err, result) => {
	    if (err) throw err
	    console.log(result.affectedRows + " record(s) updated")
  	})

	// Delete Records
	var sql = "DELETE FROM customers WHERE address = 'Mountain 21'"    // Omitting the WHERE clause will delete all the records!
	connection.query(sql, (err, result) => {
	    if (err) throw err
	    console.log("Number of records deleted: " + result.affectedRows)
	})

	// Delete a Table
	// var sql = "DROP TABLE customers"
	var sql2 = "DROP TABLE IF EXISTS customers"
    connection.query(sql2, (err, result) => {
    	if (err) throw err
    	console.log(result)    // the warningCount property is set to 1 if the table does not exist when using "sql2"
  	})

})


// Close Connection
connection.end((err) => {
    if(err) {
        console.log(err.toString())
        return
    }
    console.log('[connection ends] succeed!')
})
