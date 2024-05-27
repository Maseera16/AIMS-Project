function actor(user, pass) {
    const mysqlEjs = require("../../lib/server/mysqlEjs.js");
    let stmt = "SELECT * FROM actor LIMIT 0,500";
    let filePath = "../../../html/actor.ejs";
    // Main Code
    const html = mysqlEjs.mysqlEjs(user, pass, stmt, "sakila", filePath);
    return html;
}

exports.actor = actor;
