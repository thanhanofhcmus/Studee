const { Connection, Request } = require('tedious');

let connection = null;

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: 'studee',
      password: '6p8xfiR5FqmdJbhD'
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
      console.error(err);
    }
  });
};

const queryDatabase = () => {
  console.log('Reading rows from the Table...');

  // Read all rows from table
  const request = new Request(
    'SELECT * FROM [dbo].[User]',
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on('row', columns => {
    columns.forEach(({ metadata, value }) => {
      console.log(`${metadata.colName} : ${value}`);
    });
  });

  connection.execSql(request);
};

module.exports = {
  initDatabase,
  queryDatabase
};
