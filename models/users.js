const db = require('./azure');

const USER_TYPE_TEACHER = 0;
const USER_TYPE_STUDENT = 1;

const GENDER_FEMALE = 0;
const GENDER_MALE = 1;

const getAll = async (userType) => {
  const userTypeWhere = userType !== undefined ? `WHERE userType = ${userType}` : '';
  db.asyncExecuteSql(`SELECT * FROM [dbo].[User] ${userTypeWhere}`);
};

const findByUsername = async (username, userType) => {
  const userTypeWhere = userType !== undefined ? `WHERE userType = ${userType}` : '';
  return db.asyncExecuteSql(`SELECT * FROM [dbo].[User] WHERE username = '${username}' ${userTypeWhere}`);
};

const findByID = async (id, userType) => {
  const userTypeWhere = userType !== undefined ? `WHERE userType = ${userType}` : '';
  db.asyncExecuteSql(`SELECT * FROM [dbo].[User] WHERE userID = '${id}' ${userTypeWhere}`);
};

const insert = async (user) => {
  const paramNames = ['firstName', 'lastName', 'gender', 'phoneNumber', 'email', 'username', 'password', 'userType'];
  const paramSubs = paramNames.join(', ');
  const paramVals = paramNames.map(s => {
    const v = user[s];
    return typeof v === 'string' ? `'${v}'` : v;
  }).join(', ');
  console.log(paramVals);
  db.asyncExecuteSql(`INSERT INTO [dbo].[User](${paramSubs}) VALUES (${paramVals})`);
};

const update = (username, user) => {
  const paramNames = ['firstName', 'lastName', 'email', 'phoneNumber', 'gender'];
  const paramSubs = paramNames.map(s => {
    const v = user[s];
    const val = typeof v === 'string' ? `'${v}'` : v;
    return `${s} = ${val}`;
  }).join(', ');
  db.asyncExecuteSql(`UPDATE [dbo].[User] SET ${paramSubs} WHERE username = '${username}'`);
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
  update
};
