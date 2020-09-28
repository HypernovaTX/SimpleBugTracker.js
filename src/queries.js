const dbimport = require('./dbdriver.js');
const db = new dbimport();
const { database } = require("../config.json");

class queries {
    basicTicketList() {
        let query = db.db_buildquery_select([
            't.*',
            'u.name AS username',
            's.name AS statusname',
            's.color AS statuscolor',
            'p.name AS priorityname',
            'p.color AS prioritycolor'
        ], 't', `${database.prefix}tickets`);
        query += db.db_buildquery_join(`${database.prefix}users`, 'u', 'ON (u.uid = t.uid)');
        query += db.db_buildquery_join(`${database.prefix}status`, 's', 'ON (s.stid = t.status)');
        query += db.db_buildquery_join(`${database.prefix}priority`, 'p', 'ON (p.prid = t.priority)');
        return query;
    }
}

module.exports = queries;