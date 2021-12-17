const coursesModel = require('../../models/courses');
const teachersModel = require('../../models/teachers');

module.exports.create = (req, res) => {
  const teacher = teachersModel.findById(res.locals.teacherId);
  res.render('teachers/courses/creator', { teacher });
};

module.exports.update = (req, res) => {
  // const courseId = req.params.id;
  // const teacherId = res.locals.teacherId;

  // const course = coursesModel.toRenderData(coursesModel.findById(courseId));
  // const teacher = teachersModel.findById(teacherId);

  res.send('course update');
};

module.exports.list = (req, res) => {
  const teacherId = res.locals.teacherId;
  const courses = coursesModel
    .findByTeacherId(teacherId)
    .map(coursesModel.toRenderData)
    .map(course => ({
      ...course,
      link: `/teachers/${course.teacherId}/courses/detail/${course.id}`
    }));
  res.render('teachers/courses/list', { title: 'Danh sách khóa học', courses });
};

module.exports.detail = (req, res) => {
  const courseId = req.params.id;
  const teacherId = res.locals.teacherId;

  const course = coursesModel.toRenderData(coursesModel.findById(courseId));
  const teacher = teachersModel.findById(teacherId);

  const renderCourse = {
    ...course,
    updateLink: `/teachers/${course.teacherId}/courses/detail/${course.id}`
  };

  res.render('teachers/courses/detail', { title: 'Khóa học', course: renderCourse, teacher });
};
