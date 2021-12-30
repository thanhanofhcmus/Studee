const coursesModel = require('../models/courses');
const userModel = require('../models/users');

const list = async (req, res) => {
  const courses = await coursesModel.getAll();
  const renderCourse = courses.map(coursesModel.toRenderData);
  res.render('course/courses', { title: 'Các khoá học', courses: renderCourse });
};

const listOfUser = async (req, res) => {
  const id = req.params.id;
  const courses = await (res.locals.user.isTeacher
    ? coursesModel.findByTeacherID(id)
    : coursesModel.findByParticipatedStudentID(id));
  const renderCourse = courses.map(coursesModel.toRenderData);
  res.render('course/courses', { title: 'Các khoá học', courses: renderCourse });
};

const details = async (req, res) => {
  const id = req.params.id;
  const course = (await coursesModel.findByID(id))[0];
  const renderCourse = coursesModel.toRenderData(course);
  const teacher = await userModel.findByID(course.teacherID);
  res.render('course/details', {
    title: 'Chi tiết khoá học',
    course: renderCourse,
    teacher,
    isOwner: res.locals.loggedIn && res.locals.user.userID === course.teacherID
  });
};

const create = (req, res) => {
  res.render('course/create', { teacher: null });
};

const createPost = async (req, res) => {
  res.send('unimplemented');
};

module.exports = {
  list,
  listOfUser,
  details,
  create,
  createPost
};
