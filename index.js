var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

const dbimport = require('./src/dbdriver.js');
const db = new dbimport();

app.get('/', function (req, res) {
    db.db_connect();
    res.send('Hello World');
})

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
})