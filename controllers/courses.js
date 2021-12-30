const coursesModel = require('../models/courses');

const list = async (req, res) => {
  const courses = await coursesModel.getAll();
  const renderCourse = courses.map(coursesModel.toRenderData);
  res.render('course/courses', { title: 'Các khoá học', courses: renderCourse });
};

const courseDetails = async (req, res) => {
  res.render('course/course-details', { title: 'Chi tiết khoá học' });
};

module.exports = {
  list,
  courseDetails
};
