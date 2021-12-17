const express = require('express');
const router = express.Router();
const controller = require('../controllers/courses');

router.get('/', controller.list);

router.get('/course-details', controller.courseDetails);

module.exports = router;
