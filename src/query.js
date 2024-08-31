// src/query.js

const Database = require('./database');

class Query {
    static find(modelClass, query) {
        return Database.find(modelClass, query);
    }
}

module.exports = Query;
