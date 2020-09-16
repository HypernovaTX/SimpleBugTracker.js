var express = require('express');
var app = express();
var mysql = require('mysql')
var cors = require('cors');
app.use(cors());

const CONFIG = require("../config.json");
const connection = {
    user: CONFIG.database.user,
    password: CONFIG.database.password,
    server: CONFIG.database.server, 
    database: CONFIG.database.name 
};

class database {

    static db_query() {
        mysql.connect(connection, function (err) {
            if (err) { console.log(err); }
        });
    }

    static db_query_item(input = '') {
        
    }
}

module.exports(database);