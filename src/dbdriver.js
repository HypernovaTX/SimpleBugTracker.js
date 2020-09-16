var express = require('express');
var app = express();
var mysql = require('mysql')
var cors = require('cors');
app.use(cors());

const CONFIG = require("../config.json");
const connection = mysql.createConnection({
    user: CONFIG.database.user,
    password: CONFIG.database.password,
    server: CONFIG.database.server, 
    database: CONFIG.database.name 
});

class database {
    db_connect() {
        connection.connect(function (err) {
            if (err) { console.log(err); }
            console.log(`Connected!`);
        });
    }

    db_disconnect() {
        connection.close
    }

    db_query_item(input = '') {
        
    }
}

module.exports = database;