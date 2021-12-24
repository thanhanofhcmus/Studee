const coursesRouter = require('./courses');
const router = require('express').Router();
const teacherChecker = require('../../middleware/teacherChecker');

router.use('/courses', teacherChecker, coursesRouter);

module.exports = router;
