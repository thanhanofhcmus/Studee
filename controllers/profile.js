const student = require('../models/students');

const coursesModel = require('../models/courses');

module.exports.list = (req, res) => {
  student.gender = student.gender ? 'Nam' : 'Nữ';
  const allCourses = coursesModel.getAll();
  const courses = allCourses
    .filter(course => student.courses.some(id => id === course.id))
    .map(coursesModel.toRenderData);
  res.render('profile/profiles', { student, courses, coursesName: 'Các khóa học đã tham gia' });
};

module.exports.edit = (req, res) => {
  student.gender = student.gender ? 'Nam' : 'Nữ';
  res.render('profile/edit', { title: 'Chỉnh sửa', student });
};

module.exports.update = (req, res) => {
  res.send(req.body);
};
