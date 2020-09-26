var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

const dbimport = require('./src/dbdriver.js');
const db = new dbimport();
const CONFIG = require("./config.json");
let get_output = '';

app.get('/', function (req, res, queryCallback) {
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
    console.log(`QUERY ---------- ${query}`);
    //make a callback for the database
    db.db_query(query, (rows) => {
        if (!rows.length) { queryCallback(res.send('No results!')); }
        queryCallback(res.send(`${JSON.stringify(rows)}`));
        db.db_disconnect();
        res.end();
    });
})

/*axios.post('/list', data, {
    headers: {
        'key': CONFIG.api.key,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
})
.then(response => {
    return  response;
})
.catch((error) => {
    return  error;
});*/

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
})