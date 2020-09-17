var express = require('express');
var app = express();
var mysql = require('mysql')
var cors = require('cors');
app.use(cors());

//initialize database variables and constants
const CONFIG = require("../config.json");
const DBCONFIG = {
    user: CONFIG.database.user,
    password: CONFIG.database.password,
    server: CONFIG.database.server, 
    database: CONFIG.database.name 
}
let connection = mysql.createConnection(DBCONFIG);
connection.end();

class database {
    db_connect() {
        connection = mysql.createConnection(DBCONFIG);

        connection.connect(function (err) {
            if (err) { console.log(err); }
            console.log(`[Database] Connected!`);
        });
    }

    db_disconnect() {
        connection.end(function (err) {
            if (err) { console.log(`[Database] Error: ${err.message}`); }
            console.log(`[Database] Disconnected!`);
        });
    }

    /*db_query(input = '', queryCallback) {
        let output = 'N/A';
        if (input === '' || input === null) {
            console.log('Input for the query is empty or null!!!');
            this.db_disconnect();
            return '';
        }
        
        this.
        
        console.log(`Test to make sure this line runs outside of the query.`);
        console.log(`RESULT: ${output}`);
        
        this.db_disconnect();
        return queryCallback(output);
    }*/

    db_query(input, queryCallback) {
        connection.query(input, (error, rows) => {
            if (error || input === null) {
                console.log(error);
                return queryCallback(error);
            }
          
            console.log('[Database] Data received!');
            console.log(`[Database] Within query: ${JSON.stringify(rows)}`);
            return queryCallback(rows);
        });
    }

    //db_query_
}

module.exports = database;