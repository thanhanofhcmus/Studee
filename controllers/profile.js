const coursesModel = require('../models/courses');
const usersModel = require('../models/users');
const { GENDER_MALE, GENDER_FEMALE, USER_TYPE_TEACHER, USER_TYPE_STUDENT } = usersModel;

module.exports.list = async (req, res) => {
  const { userID, gender, isTeacher } = res.locals.user;
  const courses = await (isTeacher
    ? coursesModel.findByTeacherID(userID)
    : coursesModel.findByParticipatedStudentID(userID));
  const renderCourse = courses.map(coursesModel.toRenderData);
  res.render('profile/profiles', {
    title: 'Profile',
    courses: renderCourse,
    gender: gender === GENDER_MALE ? 'Nam' : 'Nữ',
    userType: isTeacher ? 'Giáo viên' : 'Học viên',
    coursesName: isTeacher ? 'Các khóa học đang dạy' : 'Các khóa học đã tham gia'
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
  try {
    const username = res.locals.user.name;
    await usersModel.update(username, user);
    const { password } = (await usersModel.findByUsername(username))[0];
    res.redirect(`/auth/automate-login?username=${username}&password=${password}`);
  } catch (err) {
    res.redirect('/profile/edit?somethingWrong');
  }
};
