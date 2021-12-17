const express = require('express');
const router = express.Router();
const controller = require('../controllers/courses');
const teacherRouter = require('./teachers/courses');

router.get('/', controller.list);

router.get('/course-details', (_req, res) => {
  res.render('course/course-details', { title: 'Chi tiết khoá học' });
});

router.use('/teacher', teacherRouter);

module.exports = router;
