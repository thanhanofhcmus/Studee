const student = require('../models/students');

const coursesModel = require('../models/courses');
const userModel = require('../models/user');

module.exports.list = (req, res) => {
  const allCourses = coursesModel.getAll();
  const courses = allCourses
    .filter(course => student.courses.some(id => id === course.id))
    .map(coursesModel.toRenderData);
  res.render('profile/profiles', { courses, coursesName: 'Các khóa học đã tham gia' });
};

module.exports.edit = (req, res) => {
  student.gender = student.gender ? 'Nam' : 'Nữ';
  res.render('profile/edit', { title: 'Chỉnh sửa', student });
};

module.exports.update = (req, res) => {
  const user = {
    ...req.body,
    gender: req.body.gender === 'male' ? 0 : 1,
    typeUser: req.body.typeUser === 'teacher' ? 0 : 1
  };
  userModel.update(res.locals.user.name, user, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/auth/logout');
    }
  });
};
