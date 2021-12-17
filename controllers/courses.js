const coursesModel = require('../models/courses');

module.exports.list = (req, res) => {
  const courses = coursesModel.getAll().map(coursesModel.toRenderData);
  res.render('course/courses', { title: 'Các khoá học', courses });
};
