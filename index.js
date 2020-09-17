var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

const dbimport = require('./src/dbdriver.js');
const db = new dbimport();

app.get('/', function (req, res) {
    const CONFIG = require("./config.json");
    db.db_connect();
    const get_output = db.db_query(`SELECT * FROM ${CONFIG.database.prefix}tickets`);
    res.send('Hello World <br><br>MySQL data pulled: ' + JSON.stringify(get_output));
})

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
})