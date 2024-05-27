async function mysqlapi(user, pass, stmt, db) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: user,
        password: pass,
        database: db
    });

    connection.connect();
    var sqlout = [];
    function mycb(error, results, fields) {
        if (error) throw error;
        sqlout.push(fields);
        sqlout.push(results);
    }
    connection.query(stmt, mycb);

    connection.end();
    return sqlout;
}

exports.mysqlapi = mysqlapi;
