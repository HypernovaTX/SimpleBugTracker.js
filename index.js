var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

const dbimport = require('./src/dbdriver.js');
const db = new dbimport();
const queries = require('./src/queries.js');
const quickQuery = new queries();
const CONFIG = require("./config.json");
const { exit } = require('process');


/*app.get('/', function (req, res, queryCallback) {
    db.db_connect();
    let query = db.db_buildquery_select([
        't.*',
        'u.name AS username',
        's.name AS statusname',
        's.color AS statuscolor',
        'p.name AS priorityname',
        'p.color AS prioritycolor'
    ], 't', 'tickets');
    query += db.db_buildquery_join('users', 'u', 'ON (u.uid = t.uid)');
    query += db.db_buildquery_join('status', 's', 'ON (s.stid = t.status)');
    query += db.db_buildquery_join('priority', 'p', 'ON (p.prid = t.priority)');
    query += db.db_buildquery_order(['tid'],[true]);
    console.log('Req is: VVVV');
    console.log(req);
    console.log(`QUERY ---------- ${query}`);
    //make a callback for the database
    db.db_query(query, (rows) => {
        if (!rows.length) { queryCallback(res.send('No results!')); }
        queryCallback(res.send(`${JSON.stringify(rows)}`));
        db.db_disconnect();
        res.end();
    });
})*/

app.use(express.json());

app.post('/', function (request, response, queryCallback) {
    db.db_connect();
    //default sorting method
    let sortItem = ['t.tid'];
    let sortDirection = [true]; //true is ASC, false is DESC

    if (request.body !== undefined) {
        console.log(request.body.test);
    }
    let query = quickQuery.basicTicketList();
    query += db.db_buildquery_order(sortItem, sortDirection);

    //make a callback for the database
    db.db_query(query, (rows) => {
        if (!rows.length) { queryCallback(response.send('["No results!"]')); }
        queryCallback(response.send(`${JSON.stringify(rows)}`));
        db.db_disconnect();
        response.end();
    });
})

app.post('/newticket', function (request, response, queryCallback) {
    db.db_connect();
    let POSTDATA = [];
    const insertColumns = ['title', 'description', 'status', 'priority', 'user'];
    if (request.body === undefined) {
        response.send('NO DATA IMPORTED');
    }

    POSTDATA = [
        request.body.title,
        request.body.description,
        request.body.status,
        request.body.priority,
        '1' //SET 1 as a placeholder until I implement user functions
    ];
    let query = db.db_buildquery_insert(`${CONFIG.database.prefix}tickets`, insertColumns, POSTDATA);

    //make a callback for the database
    db.db_query(query, (rows) => {
        if (!rows.length) { queryCallback(response.send('["No results!"]')); }
        queryCallback(response.send(`${JSON.stringify(rows)}`));
        db.db_disconnect();
        response.end();
    });
})

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
})