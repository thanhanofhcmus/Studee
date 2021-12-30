const coursesModel = require('../models/courses');
const usersModel = require('../models/users');
const { GENDER_MALE, GENDER_FEMALE, USER_TYPE_TEACHER, USER_TYPE_STUDENT } = usersModel;

module.exports.list = (req, res) => {
  const allCourses = coursesModel.getAll();
  const courses = allCourses
    // .filter(course => student.courses.some(id => id === course.id))
    .map(coursesModel.toRenderData);
  const { gender, userType } = res.locals.user;
  res.render('profile/profiles', {
    title: 'Profile',
    courses,
    gender: gender === GENDER_MALE ? 'Nam' : 'Nữ',
    userType: userType === USER_TYPE_TEACHER ? 'Giáo viên' : 'Học viên',
    coursesName: 'Các khóa học đã tham gia'
  });
};

module.exports.edit = (req, res) => {
  res.render('profile/edit', { title: 'Chỉnh sửa' });
};

module.exports.update = async (req, res) => {
  const user = {
    ...req.body,
    gender: req.body.gender === 'male' ? GENDER_MALE : GENDER_FEMALE,
    typeUser: req.body.typeUser === 'teacher' ? USER_TYPE_TEACHER : USER_TYPE_STUDENT
  };
  const result = await usersModel.update(res.locals.user.name, user);
  console.log(result);
  res.redirect('/auth/logout');
};
