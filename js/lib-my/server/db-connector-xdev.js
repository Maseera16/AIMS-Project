// This file uses mysql/xdevapi released by mysql
const mysqlx = require('@mysql/xdevapi');
const config = {
    user: 'alpha',
    password: 'alpha',
    // auth: 'MYSQL41',
    // tls: {enabled:false, versions: null },
    host: 'localhost',
    port: 33060,
    schema: 'testdb',
    
};

mysqlx.getSession(config)
    .then(session => {
        return session.sql(`select * from testdb.userid `)
            .execute()
            .then(res => {
                var columns = res.fetchAll()
                console.log(columns) // name
              })
            .then(() => {
                return session.close();
            })});
    





// let stmt = "select * from userid \;";

