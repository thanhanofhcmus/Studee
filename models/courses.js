const db = require('./azure');

const toRenderData = course => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatTime = time => `${('0' + time.getHours()).slice(-2)}:${('0' + time.getSeconds()).slice(-2)}`;
  const { startDate, startTime, endTime } = course;
  return {
    ...course,
    month: months[startDate.getMonth()],
    link: `/courses/details/${course.courseID}`,
    imageLink: '/assets/images/meeting-04.jpg',
    formattedStartTime: formatTime(startTime),
    formattedEndTime: formatTime(new Date(endTime))
  };
};

const convertDateStr = course => ({
  ...course,
  startDate: new Date(course.startDate),
  startTime: new Date(course.startTime),
  duration: new Date(course.duration)
});

const mapCDS = courses => courses.map(convertDateStr);

const getAll = () => db.asyncExecuteSql('SELECT * FROM [dbo].[Course]').then(mapCDS);

const findByID = id => db.asyncExecuteSql(`SELECT * FROM [dbo].[Course] WHERE courseID = ${id}`).then(mapCDS);

const findByTeacherID = id => db.asyncExecuteSql(`SELECT * FROM [dbo].[Course] WHERE teacherID = ${id}`).then(mapCDS);

const findByParticipatedStudentID = id =>
  db.asyncExecuteSql(`
  SELECT *
  FROM [dbo].[Course] AS C JOIN [dbo].[Participate] AS P
  ON C.courseID = P.courseID
  WHERE P.studentID = ${id}
  `)
    .then(mapCDS);

const insert = course => {
  const paramNames = ['teacherID', 'courseName', 'courseDesc', 'startDate', 'startTime', 'endTime', 'price'];
  const paramSubs = paramNames.join(', ');
  const paramVals = paramNames.map(s => {
    const v = course[s];
    return typeof v === 'string' ? `'${v}'` : v;
  }).join(', ');
  return db.asyncExecuteSql(`INSERT INTO [dbo].[Course](${paramSubs}) VALUES (${paramVals})`);
};

const update = (id, course) => {
  const paramNames = ['courseName', 'courseDesc', 'startDate', 'startTime', 'endTime', 'price'];
  const paramVals = paramNames.map(s => {
    const v = course[s];
    const val = typeof v === 'string' ? `'${v}'` : v;
    return `${s} = ${val}`;
  }).join(', ');
  return db.asyncExecuteSql(`UPDATE [dbo].[Course] SET ${paramVals} WHERE courseID = ${id}`);
};

const remove = id => db.asyncExecuteSql(`DELETE FROM [dbo].[Course] WHERE courseID = '${id}'`);

module.exports = {
  getAll,
  findByID,
  findByTeacherID,
  findByParticipatedStudentID,
  insert,
  update,
  remove,
  toRenderData
};
