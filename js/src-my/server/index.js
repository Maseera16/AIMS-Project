const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
// const chAuth = require('./login.js');
const chAuth = require('./login-os.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../html")));

let username = null;
let password = null;

app.post("/", (req, res) => {
  username = req.body.username;
  password = req.body.password;
  if (chAuth.chAuth(username, password)) {
    res.send(
      `<script>location.href = '../add-view-products.html'</script>`
    );
  }
  else {
    res.send(
      `<script>alert("Incorrect USERNAME or PASSWORD")</script>
        <script>location.href = '../index.html'</script>`
    )
  }

});

app.listen(port, () => {
  console.log(`server is on localhost:${port}`)
})
