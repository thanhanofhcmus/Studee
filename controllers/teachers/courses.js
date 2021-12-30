// const usersModel = require('../../models/users');

module.exports.create = (req, res) => {
  res.render('teachers/courses/creator', { teacher: null });
};

module.exports.update = (req, res) => {
  res.send('course update');
};

module.exports.list = (req, res) => {
  // const teacherId = res.locals.user.id;
  // const courses = coursesModel
  //   .findByTeacherId(teacherId)
  //   .map(coursesModel.toRenderData)
  //   .map(course => ({
  //     ...course,
  //     link: `/teachers/courses/detail/${course.id}`
  //   }));
  res.render('teachers/courses/list', { title: 'Danh sách khóa học', courses: null });
};

module.exports.detail = (req, res) => {
  // const courseId = req.params.id;
  // const teacherId = res.locals.user.id;

  // const course = coursesModel.toRenderData(coursesModel.findById(courseId));
  // const teacher = teachersModel.findById(teacherId);

  // const renderCourse = {
  //   ...course,
  //   updateLink: `/teachers/courses/detail/${course.id}`
  // };
  const renderCourse = null;

  res.render('teachers/courses/detail', { title: 'Khóa học', course: renderCourse, teacher: null });
};
