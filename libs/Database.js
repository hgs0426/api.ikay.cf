const mysql = require('mysql');
const config = require('../config.json').database;

class Database {

  constructor(dbName) {
    if ( 'stores' === dbName ) {
      this.opts = config.convenienceStores;
    } else if ( 'ikay' === dbName ) {
      this.opts = config.user;
    } else {
      throw new Error('dbName is not defined!!');
    }
  }    

  query(sql) {
    return new Promise( (resolve, reject) => {
      const conn = mysql.createConnection(this.opts);
      conn.connect();
      conn.query(sql, (error, results, fields) => {
        conn.end();
        if (error) { reject(error); }
        resolve(results);
      });
    });
  }

}

module.exports = Database;