const student = require('../models/students');
const coursesModel = require('../models/courses');

module.exports.list = (req, res) => {
  const allCourses = coursesModel.getAll();
  const courses = allCourses
    .filter(course => student.courses.some(id => id === course.id))
    .map(coursesModel.toRenderData);
  res.render('profiles', { student, courses, coursesName: 'Các khóa học đã tham gia' });
};
