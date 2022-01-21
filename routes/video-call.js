const router = require('express').Router();
const controller = require('../controllers/video-call');

router.get('/', controller.index);

router.get('/list', controller.list);

module.exports = router;
