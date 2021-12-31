const db = require('./azure');

const findByBothID = (courseID, studentID) =>
  db.asyncExecuteSql(`SELECT * FROM [dbo].[Participate] WHERE courseID = ${courseID} AND studentID = ${studentID}`);

const insert = (courseID, studentID) =>
  db.asyncExecuteSql(`INSERT INTO [dbo].[Participate](courseID, studentID) VALUES (${courseID}, ${studentID})`);

const remove = (courseID, studentID) =>
  db.asyncExecuteSql(`DELETE FROM [dbo].[Participate] WHERE courseID = ${courseID} AND studentID = ${studentID}`);

module.exports = {
  findByBothID,
  insert,
  remove
};
