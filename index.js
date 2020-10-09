var express = require('express');
var app = express();
var cors = require('cors');
var SqlString = require('sqlstring');
app.use(cors());

const dbimport = require('./src/dbdriver.js');
const db = new dbimport();
const queries = require('./src/queries.js');
const quickQuery = new queries();
const CONFIG = require("./config.json");
const { exit } = require('process');

/*app.get('/', function (req, res, queryCallback) {
})*/

app.use(express.json());
db.db_connect();

app.post('/', function (request, response, queryCallback) {
    //db.db_connect();
    //default sorting method
    let sortItem = ['t.tid'];
    let sortDirection = [true]; //true is ASC, false is DESC

    if (request.body !== undefined) {
        sortItem = request.body.sortItem;
        sortDirection = request.body.sortDirection;
    }
    let query = quickQuery.basicTicketList();
    query += db.db_buildquery_order(sortItem, sortDirection);
    //console.log(`[QUERY] -- ${query}`);

    //make a callback for the database
    db.db_query(query, (rows) => {
        if (!rows.length) {
            queryCallback(response.send('["No results!"]'));
        }
        queryCallback(response.send(`${JSON.stringify(rows)}`));
        //db.db_disconnect();
        response.end();
    });
})

app.post('/quickquery', function (request, response, queryCallback) {
    //db.db_connect();
    if (request.body === undefined) {
        return;
    }

    let query = db.db_buildquery_select(['*'], '', CONFIG.database.prefix + request.body.table);
    //console.log(`[QUERY #2] -- ${query}`);
    console.log(`Running "/quickquery"`);

    //make a callback for the database
    db.db_query(query, (rows) => {
        if (!rows.length) {
            queryCallback(response.send('["No results!"]'));
        }
        queryCallback(response.send(`${JSON.stringify(rows)}`));
        //db.db_disconnect();
        response.end();
    });
})

app.post('/newticket', function (request, response, queryCallback) {
    //db.db_connect();
    let POSTDATA = [];
    const insertColumns = ['title', 'description', 'status', 'priority', 'platform', 'time', 'uid'];
    if (request.body === undefined) {
        response.send('NO DATA IMPORTED');
    }

    POSTDATA = [
        request.body.title,
        request.body.description,
        parseInt(request.body.status),
        parseInt(request.body.priority),
        parseInt(request.body.platform),
        parseInt(request.body.time),
        parseInt(request.body.uid)
    ];
    let query = db.db_buildquery_insert(`${CONFIG.database.prefix}tickets`, insertColumns, POSTDATA);
    console.log(`[QUERY ADD TICKET] -- ${query}`);
    //make a callback for the database
    db.db_query(query, () => {response.send('SENT')}, true);
})

app.post('/updateticket', function (request, response, queryCallback) {
    //db.db_connect();
    let POSTDATA = [];
    const updateColumns = ['title', 'description', 'status', 'priority', 'platform', 'lastedit', 'uid'];
    if (request.body === undefined) {
        response.send('NO DATA IMPORTED');
    }

    POSTDATA = [
        request.body.title,
        request.body.description,
        parseInt(request.body.status),
        parseInt(request.body.priority),
        parseInt(request.body.platform),
        parseInt(request.body.time),
        parseInt(request.body.uid)
    ];
    let query = db.db_buildquery_update(`${CONFIG.database.prefix}tickets`, updateColumns, POSTDATA);
    query += `WHERE (tid = ${SqlString.escape(request.body.tid)}) `;
    console.log(`[QUERY UPDATE TICKET] -- ${query}`);
    //make a callback for the database
    db.db_query(query, () => {response.send('SENT')}, true);
})

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
})