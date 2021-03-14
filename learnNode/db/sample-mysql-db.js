var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"//,
  //database: "mydb" // Once DB is created
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql_arr = []; 
  sql_arr.push("CREATE DATABASE mydb");
  sql_arr.push("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))");
  sql_arr.push("ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY");
  sql_arr.forEach(sql_str => { 
	con.query(sql_str, function (err, result) {
	if (err) throw err;
    console.log("Database & Table with PK created");
	});
  }

  var insert_sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
  con.query(insert_sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });

  var batch_insert_sql = "INSERT INTO customers (name, address) VALUES ?";
  var values = [
    ['John', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
  ];
  con.query(batch_insert_sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

  // fields:: an array containing information about each field as an object
  var adr = 'Mountain 21';
  var select_sql = "SELECT * FROM customers WHERE address = " + mysql.escape(adr);
  con.query(select_sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    console.log(fields[1].name); // second array item's name property
  });
  // var sql = 'SELECT * FROM customers WHERE name = ? OR address = ?';
  // con.query(sql, [name, adr],...

});