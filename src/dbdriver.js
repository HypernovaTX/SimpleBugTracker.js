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
            console.log(`Database Connected!`);
        });
    }

    db_disconnect() {
        connection.end(function (err) {
            if (err) { console.log(`error: ${err.message}`); }
            console.log(`Database Disconnected!`);
        });
    }

    db_query(input = '') {
        let output = '';
        if (input === '' || input === null) {
            console.log('Input for the query is empty or null!!!');
            this.db_disconnect();
            return {};
        }
        connection.query(input, (err, rows) => {
            if (err) { console.log(err); }// throw err;
          
            console.log('Data received!');
            output = JSON.stringify(rows);
            console.log(`Within query: ${JSON.stringify(rows)}`);
        });
        console.log(`Test to make sure this line runs outside of the query.`);
        console.log(`Outside query: ${output}`);
        
        this.db_disconnect();
        return output;
    }

    //db_query_
}

module.exports = database;