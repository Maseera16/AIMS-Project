// This file uses npm mysql driver released by npm
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'beta',
    password: 'beta',
    database: 'sakila'
});

connection.connect();
let sql = "select * from userid";
connection.query(sql, function (error, results, fields) {
    if (error) { console.log(error) };
    return console.log('The solution is: ', results);
});

connection.end();
