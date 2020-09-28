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
// ↑ Since we initialized "connection" as the right variable.
// ↓ we need to end this unused connection.
connection.end();


class database {
    //Run this before every query
    db_connect() {
        connection = mysql.createConnection(DBCONFIG);
        connection.connect(function (error) {
            if (error) { console.log(error); }
            console.log(`[Database] Connected!`);
        });
    }

    //To prevent unused processes, this MUST be executed after running a query
    db_disconnect() {
        connection.end(function (error) {
            if (error) { console.log(`[Database] Error: ${error.message}`); }
            console.log(`[Database] Disconnected!`);
        });
    }

    /** Do the query
     * @param {string} input - The query that needs to run, please use db_buildquery_* functions
     * @param {(rows) => {}} queryCallback - Needs to have a callback: (rows) => { <codes to obtain "rows" (as object)> }
     */
    db_query(input, queryCallback) {
        connection.query(input, (error, rows) => {
            if (error || input === null) {
                console.log(`[Database] Error: ${error.message || 'input is NULL'}`);
                return queryCallback(error);
            }
          
            console.log('[Database] Data received!');
            console.log(`[Database] Within query: ${JSON.stringify(rows)}`);
            return queryCallback(rows);
        });
    }

    /** build query - select
     * @param {[string]} columns - Columns for SELECT
     * @param {string} AS - for AS (leave '' so it will not be used)
     * @param {*} table - table for FROM
     * @returns {string} - SELECT <columns> FROM <table>
     */
    db_buildquery_select(columns = ['*'], AS = '', table) {
        if (table === null || AS === null) { return ''; }

        let asAdd = ''
        if (AS !== '') { asAdd = `AS ${AS}`; }

        return `SELECT ${columns.join(', ')} 
                FROM ${table} ${asAdd} `;
    }

    /** build query - where
     * @param {string} statements
     * @returns {string} - WHERE <statements>
     */
    db_buildquery_where(statements = '') {
        return `WHERE (${statements}) `;
    }

    /** build query - join
     * @param {*} table - table for FROM
     * @param {string} AS - for AS (cannot be left blank)
     * @param {string} statements
     * @returns {string} - JOIN <statements>
     */
    db_buildquery_join(table = '', AS = '', statements = '') {
        if (table === null || AS === null) { return ''; }
        return `JOIN ${table} AS ${AS} ${statements} `;
    }

    /** build query - order
     * @param {string[]} column - which columns to order
     * @param {boolean[]} ascending - order direction (MUST have the same number of arrays as column)
     * @returns {string} - ORDER BY <statements>
     */
    db_buildquery_order(column = [''], ascending = [true]) {
        if (column === ['']) { return ''; }

        let list = [];
        ascending.forEach((value, index) => {
            list.push(`${column[index]} ${(value === true) ? 'ASC' : 'DESC'}`);
        });
        return `ORDER BY ${list.join(', ')} `;
    }

    /** build query - insert
     * @param {table} table - which table to insert
     * @param {[string]} columns - Columns for insert
     * @param {[string]} values - Values to insert
     * @returns {string} - INSERT INTO <table> (<columns>) VALUES (<values>)
     */
    db_buildquery_insert(table, columns = [''], values = ['']) {
        if (table === null || columns === [''] || values === ['']) {
            return '';
        }
        columns.forEach(number => {
            
        });
        return `INSERT INTO ${table}
            (${columns.join(', ')})
            VALUES (${values.join(', ')}) `
    }

    //Q: Why isn't there a delete query?
    //A: To keep everything in record, all queries are kept in the database.
}

module.exports = database;