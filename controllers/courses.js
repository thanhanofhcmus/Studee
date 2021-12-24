const coursesModel = require('../models/courses');

const list = (req, res) => {
  const courses = coursesModel.getAll().map(coursesModel.toRenderData);
  res.render('course/courses', { title: 'Các khoá học', courses });
};

const courseDetails = async (req, res) => {
  res.render('course/course-details', { title: 'Chi tiết khoá học' });
};

module.exports = {
  list,
  courseDetails
};
