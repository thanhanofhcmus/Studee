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
  res.render('course/create', { somethingWrong: req.query.somethingWrong });
};

const createPost = async (req, res) => {
  const teacherID = res.locals.user.userID;
  const course = { ...req.body, teacherID };
  try {
    await coursesModel.insert(course);
    res.redirect(`/courses/list-of-user/${teacherID}`);
  } catch (err) {
    console.log(err);
    res.redirect('/courses/create?somethingWrong');
  }
};

const edit = async (req, res) => {
  const id = req.params.id;
  const course = (await coursesModel.findByID(id))[0];
  const isValid = res.locals.loggedIn && res.locals.user.userID === course.teacherID;
  res.render('course/edit', {
    somethingWrong: req.query.somethingWrong,
    course,
    isValid
  });
};

const editPost = async (req, res) => {
  const id = req.params.id;
  const course = req.body;
  try {
    await coursesModel.update(id, course);
    res.redirect(`/courses/details/${id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/courses/edit/:id?somethingWrong');
  }
};

module.exports = {
  list,
  listOfUser,
  details,
  create,
  createPost,
  edit,
  editPost
};
