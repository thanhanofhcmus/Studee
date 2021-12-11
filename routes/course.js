const express = require('express');
const router = express.Router();

/* GET Course home page. */
router.get('/', (req, res) => {
  res.render('course/courses', { title: 'Các khoá học' });
});

router.get('/course-details', (req, res) => {
  res.render('course/course-details', { title: 'Chi tiết khoá học' });
});

module.exports = router;
