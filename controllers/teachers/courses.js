const coursesModel = require('../../models/courses');
const teachersModel = require('../../models/teachers');

module.exports.create = (req, res) => {
  const teacher = teachersModel.findById(res.locals.user.id);
  res.render('teachers/courses/creator', { teacher });
};

module.exports.update = (req, res) => {
  res.send('course update');
};

module.exports.list = (req, res) => {
  const teacherId = res.locals.user.id;
  const courses = coursesModel
    .findByTeacherId(teacherId)
    .map(coursesModel.toRenderData)
    .map(course => ({
      ...course,
      link: `/teachers/courses/detail/${course.id}`
    }));
  res.render('teachers/courses/list', { title: 'Danh sách khóa học', courses });
};

module.exports.detail = (req, res) => {
  const courseId = req.params.id;
  const teacherId = res.locals.user.id;

  const course = coursesModel.toRenderData(coursesModel.findById(courseId));
  const teacher = teachersModel.findById(teacherId);

  const renderCourse = {
    ...course,
    updateLink: `/teachers/courses/detail/${course.id}`
  };

  res.render('teachers/courses/detail', { title: 'Khóa học', course: renderCourse, teacher });
};
