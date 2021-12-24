const express = require('express');
const router = express.Router();
const controller = require('../controllers/courses');
const teacherRouter = require('./teachers/courses');

router.get('/', controller.list);
router.get('/list', controller.list);

router.get('/course-details', controller.courseDetails);

router.use('/teacher', teacherRouter);

module.exports = router;
