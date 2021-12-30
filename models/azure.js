const { Connection, Request } = require('tedious');
const con = require('../config');
let connection = null;

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: con.AZURE_USERNAME,
      password: con.AZURE_PASSWORD
    },
    type: 'default'
  },
  server: 'studee.database.windows.net',
  options: {
    database: 'N12-NMCNPM',
    encrypt: true
  }
};

const initDatabase = () => {
  connection = new Connection(config);

  connection.connect(err => {
    if (err) {
      console.error('azure error: ', err);
    }
  });
};

const executeSql = (sqlString, callback) => {
  // Read all rows from table
  const resRows = [];

  const request = new Request(
    sqlString,
    (err, rowCount) => {
      callback ? callback(err, resRows) : console.error('azure error: request database, no callback provided');
    }
  );

  request.on('error', err => console.error(`azure request error: ${err}`));

  request.on('row', columns => {
    const obj = {};
    columns.forEach(({ metadata, value }) => { obj[metadata.colName] = value; });
    resRows.push(obj);
  });

  connection.execSql(request);
};

const asyncExecuteSql = sqlString =>
  new Promise((resolve, reject) => executeSql(sqlString, (err, rows) => err ? reject(err) : resolve(rows)));

module.exports = {
  initDatabase,
  executeSql,
  asyncExecuteSql
};
