const express = require('express');
const router = express.Router();
const controller = require('../controllers/courses');

router.get('/', controller.list);

router.get('/course-details', (req, res) => {
  res.render('course/course-details', { title: 'Chi tiết khoá học' });
});

module.exports = router;
