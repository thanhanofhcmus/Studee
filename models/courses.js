const db = require('./azure');

const toRenderData = course => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatTime = time => `${('0' + time.getHours()).slice(-2)}:${('0' + time.getSeconds()).slice(-2)}`;
  const { startDate, startTime, endTime } = course;
  return {
    ...course,
    month: months[startDate.getMonth()],
    link: '/courses/course-details',
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

module.exports = {
  getAll,
  findByID,
  findByTeacherID,
  toRenderData
};
