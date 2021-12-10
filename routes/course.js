const express = require('express');
const router = express.Router();

/* GET Course home page. */
router.get('/', (req, res, next) => {
  res.render('course/courses', { title: 'Các khoá học' });
});

router.get('/course-details', (req, res, next) => {
  res.render('course/course-details', { title: 'Chi tiết khoá học' });
});

module.exports = router;
