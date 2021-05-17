const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const mysql = require("mysql2");
var qs = require('querystring');
const app = express();
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "nodejs",
    password: "root"
  });

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});
app.get('/lk', (req, res) => {
    res.send('Hello from A!');
});
app.get('/admin', (req, res) => {
    cookieemail = res.getHeader('Set-Cookie');
    res.sendFile(`${__dirname}/public/admin.html`);
});
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/login', function(request, response){
    email = request.body.email;
    password = request.body.password;
});
app.post('/register', function(request, response){
    email = request.body.email;
    password = request.body.password;
    const user = [email, password, '0'];
    
const sql = "INSERT INTO user(email, password, admin) VALUES(?, ?, ?)";
 
connection.query(sql, user, function(err, results) {
    if(err) console.log(err);
    else console.log("Данные добавлены");
});
response.setHeader('Set-Cookie', `email=${email};`);
response.redirect('/cabinet');
});
app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});