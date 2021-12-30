const db = require('./azure');

const USER_TYPE_TEACHER = 0;
const USER_TYPE_STUDENT = 1;

const GENDER_FEMALE = 0;
const GENDER_MALE = 1;

const getAll = (userType) => {
  const userTypeWhere = userType !== undefined ? `WHERE userType = ${userType}` : '';
  db.asyncExecuteSql(`SELECT * FROM [dbo].[User] ${userTypeWhere}`);
};

const findByUsername = (username, userType) => {
  const userTypeWhere = userType !== undefined ? `WHERE userType = ${userType}` : '';
  return db.asyncExecuteSql(`SELECT * FROM [dbo].[User] WHERE username = '${username}' ${userTypeWhere}`);
};

const findByID = (id, userType) => {
  const userTypeWhere = userType !== undefined ? `WHERE userType = ${userType}` : '';
  return db.asyncExecuteSql(`SELECT * FROM [dbo].[User] WHERE userID = '${id}' ${userTypeWhere}`);
};

const insert = (user) => {
  const paramNames = ['firstName', 'lastName', 'gender', 'phoneNumber', 'email', 'username', 'password', 'userType'];
  const paramSubs = paramNames.join(', ');
  const paramVals = paramNames.map(s => {
    const v = user[s];
    return typeof v === 'string' ? `'${v}'` : v;
  }).join(', ');
  return db.asyncExecuteSql(`INSERT INTO [dbo].[User](${paramSubs}) VALUES (${paramVals})`);
};

const update = (username, user) => {
  const paramNames = ['firstName', 'lastName', 'email', 'phoneNumber', 'gender'];
  const paramVals = paramNames.map(s => {
    const v = user[s];
    const val = typeof v === 'string' ? `'${v}'` : v;
    return `${s} = ${val}`;
  }).join(', ');
  return db.asyncExecuteSql(`UPDATE [dbo].[User] SET ${paramVals} WHERE username = '${username}'`);
};

const remove = (username) => {
  return db.asyncExecuteSql(`DELETE FROM [dbo.[User] WHERE username = '${username}'`);
};

module.exports = {
  USER_TYPE_TEACHER,
  USER_TYPE_STUDENT,
  GENDER_MALE,
  GENDER_FEMALE,
  getAll,
  findByID,
  findByUsername,
  insert,
  update,
  remove
};
