const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const chAuth = require('../../lib/server/checkAuthentication.js');
const queryFunc = require("../../lib/server/mysqlEjs.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve index.html
app.use(express.static(path.join(__dirname, "../../..")));

let user = null; // username
let pass = null; // password

app.post("/", (req, res) => {                                         //LOGIN 
  user = req.body.username;
  pass = req.body.password;
  if (chAuth.chAuth(user, pass)) {
    res.send(
      `<script>location.href = './html/dashboard.html'</script>`
      // `<script>location.href = '../../html'</script>`
    );
  }
  else {
    res.send(
      `<script>alert("Incorrect USERNAME or PASSWORD")</script>
        <script>location.href = 'index.html'</script>`
    )
  }

});
// 888888888888888888888888888888888888888888   Show Table  88888888888888888888888888888888888888888888888888888888888
app.get("/html/actors.html", (req, res) => {
    const actor = require("./actor.js");
    const html = actor.actor(user, pass);
    setTimeout( () => {
    res.send(html[0]);
    }, 500);
});
// 88888888888888888888888888888888888888888888   Searching   88888888888888888888888888888888888888888888888888888888888888
app.post("/searching", (req, res) => {
  var values = req.body;
  let filePath = "../../../html/table.ejs";
  const html = queryFunc.mysqlEjs(user, pass, values.stmt, "sakila", filePath);
  setTimeout(() => {
    res.send(html[0]);
  }, 100);
});
// 88888888888888888888888888888888888888888888   Add new   888888888888888888888888888888888888888888888888888888888888
app.post("/addNew", function (req, res) {
  let values = req.body;
  let actor_id = req.body.actor_id;
  let filePath = "../../../html/table.ejs";
  queryFunc.mysqlEjs(user, pass, values.stmt, "sakila", filePath);
  res.send("Actor id " + actor_id + " is successfully added to database");
});
app.post("/newTable", (req, res) => {
  values = req.body;
  filePath = "../../../html/updatedTable.ejs";
  let html=queryFunc.mysqlEjs(user, pass, values.stmt, "sakila", filePath);    //show updated
  setTimeout(() => {
    res.send(html[0]);
  }, 100);
});
// 88888888888888888888888888888888888888888888   Delete   88888888888888888888888888888888888888888888888888888888888888888888888
app.post("/deleting", (req, res) => {
  let values = req.body;
  let actor_id = req.body.actor_id;
  let filePath = "../../../html/table.ejs";
  queryFunc.mysqlEjs(user, pass, values.stmt, "sakila", filePath);
  res.send("Actor id " + actor_id + " is deleted from database");
});
// 888888888888888888888888888888888888888888888   Update  888888888888888888888888888888888888888888888888888888888888888888
app.get("/Edit", (req, res) => {
  var stmt = req.query.stmt;
  let filePath = "../../../html/Edit.ejs";
  const html = queryFunc.mysqlEjs(user, pass, stmt, "sakila", filePath);  //getting row to be updated
  setTimeout(() => {
    res.send(html[0]);
  }, 100);
});

app.post("/Edit", (req, res) => {
  let values = req.body;
  let filePath = "../../../html/table.ejs";
  queryFunc.mysqlEjs(user, pass, values.stmt, "sakila", filePath);     //update query is running
  res.send("Actor Record Updated");
  // showTable(res);   
});

app.post("/Edited", (req, res) => {
  values = req.body;
  filePath = "../../../html/updatedTable.ejs";
  let html=queryFunc.mysqlEjs(user, pass, values.stmt, "sakila", filePath);    //show updated
  setTimeout(() => {
    res.send(html[0]);
  }, 100);
});
// 88888888888888888888888888888888888888888888   listen(3000)   8888888888888888888888888888888888888888888888888888
app.listen(port, () => {
  console.log(`server is on localhost:${port}`)
})
