var express = require('express');
var router = express.Router();

/* GET Course home page. */
router.get('/', function(req, res, next) {
  res.render('course/courses', { title: 'Các khoá học' });
});

router.get('/course-details', function(req, res, next) {
    res.render('course/course-details', { title: 'Chi tiết khoá học'});
});

module.exports = router;
