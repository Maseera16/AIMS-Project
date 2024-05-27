function mysqlEjs(user, pass, stmt, db, ejsFilePath) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: user,
        password: pass,
        database: db
    });

    connection.connect();
    const html = [];
    function mycb(error, results, fields) {
        // if (error) throw error;
        const ejs = require('ejs');
        const fs = require('fs');
        const param = { thead: fields, tbody: results };
        let ejsFile = ejsFilePath;
        const fileContents = fs.readFileSync(ejsFile, 'utf8');

        html[0] = ejs.render(fileContents, param);
    }
    connection.query(stmt, mycb);
    
    connection.end();
    return html;
}

exports.mysqlEjs = mysqlEjs;