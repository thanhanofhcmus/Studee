const db = require('./azure');

const USER_TYPE_TEACHER = 0;
const USER_TYPE_STUDENT = 1;

const GENDER_FEMALE = 0;
const GENDER_MALE = 1;

const getAll = (callback, userType) => {
  const userTypeWhere = userType !== undefined ? `WHERE userType = ${userType}` : '';
  db.executeSql(`SELECT * FROM [dbo].[User] ${userTypeWhere}`, callback);
};

const findByUsername = (username, callback, userType) => {
  const userTypeWhere = userType !== undefined ? `WHERE userType = ${userType}` : '';
  db.executeSql(`SELECT * FROM [dbo].[User] WHERE username = '${username}' ${userTypeWhere}`, callback);
};

const findByID = (id, callback, userType) => {
  const userTypeWhere = userType !== undefined ? `WHERE userType = ${userType}` : '';
  db.executeSql(`SELECT * FROM [dbo].[User] WHERE userID = '${id}' ${userTypeWhere}`, callback);
};

const insert = (user, callback) => {
  const paramNames = ['userID', 'firstName', 'lastName', 'gender', 'phoneNum', 'email', 'username', 'password', 'userType'];
  const paramSubs = paramNames.map(s => {
    const v = user[s];
    const val = typeof v === 'string' ? `'${v}'` : v;
    return `${s} = ${val}`;
  }).join(', ');
  console.log(paramSubs);
  db.executeSql(
    `INSERT INTO [dbo].[User] VALUES (${paramSubs})`,
    callback
  );
};

const update = (username, user, callback) => {
  const paramNames = ['firstName', 'lastName', 'email', 'phoneNumber', 'gender'];
  const paramSubs = paramNames.map(s => {
    const v = user[s];
    const val = typeof v === 'string' ? `'${v}'` : v;
    return `${s} = ${val}`;
  }).join(', ');
  db.executeSql(
    `UPDATE [dbo].[User] SET ${paramSubs} WHERE username = '${username}'`,
    callback
  );
};

module.exports = {
  getAll,
  insert,
  update,
  findByID,
  findByUsername,
  USER_TYPE_TEACHER,
  USER_TYPE_STUDENT,
  GENDER_MALE,
  GENDER_FEMALE
};
