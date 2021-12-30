const coursesModel = require('../models/courses');
const userModel = require('../models/user');
const usersModel = require('../models/users');

module.exports.list = (req, res) => {
  const allCourses = coursesModel.getAll();
  const courses = allCourses
    // .filter(course => student.courses.some(id => id === course.id))
    .map(coursesModel.toRenderData);
  const { gender, userType } = res.locals.user;
  res.render('profile/profiles', {
    title: 'Profile',
    courses,
    gender: gender === usersModel.GENDER_MALE ? 'Nam' : 'Nữ',
    userType: userType === usersModel.USER_TYPE_TEACHER ? 'Giáo viên' : 'Học viên',
    coursesName: 'Các khóa học đã tham gia'
  });
};

module.exports.edit = (req, res) => {
  // student.gender = student.gender ? 'Nam' : 'Nữ';
  res.render('profile/edit', { title: 'Chỉnh sửa', student: null });
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
