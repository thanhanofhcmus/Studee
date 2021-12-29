const db = require('./azure');
const { VarChar, TinyInt } = require('tedious').TYPES;

const getAll = (callback) => {
  db.executeSql('SELECT * FROM [dbo].[User]', callback);
};

const findByUsername = (username, callback) => {
  db.executeSql(`SELECT * FROM [dbo].[User] WHERE username = '${username}'`, callback);
};

const insert = (user, callback) => {
  const paramNames = ['username', 'password', 'firstName', 'lastName', 'email', 'phoneNumber', 'gender', 'typeUser'];
  const paramTypes = [VarChar, VarChar, VarChar, VarChar, VarChar, VarChar, VarChar, TinyInt, TinyInt];
  const sqlParams = paramNames.map(s => '@' + s).join(', ');
  const params = paramNames.map((name, i) => ({ key: name, type: paramTypes[i], value: user[name] }));

  db.executeSql(
    `INSERT INTO [dbo].[User] VALUES (${sqlParams})`,
    callback,
    params
  );
};

module.exports = {
  getAll,
  insert,
  findByUsername
};
