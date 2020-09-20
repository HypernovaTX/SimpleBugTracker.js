var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

const dbimport = require('./src/dbdriver.js');
const db = new dbimport();
//const CONFIG = require("./config.json");
//let get_output = '';

app.get('/', function (req, res, queryCallback) {
    db.db_connect();
    const query = db.db_buildquery_select(['*'], 'tickets') + db.db_buildquery_where('tid = 1');
    db.db_query(query, (rows) => {
        if (!rows.length) { queryCallback(res.send('No results!')); }
        queryCallback(res.send(`MySQL data pulled: ${JSON.stringify(rows)}`));
        db.db_disconnect();
        res.end();
    });
})

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
})