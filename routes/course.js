const express = require('express');
const router = express.Router();
const controller = require('../controllers/courses');

router.get('/', controller.list);
router.get('/list', controller.list);
router.get('/list-of-user/:id', controller.listOfUser);

router.get('/details/:id', controller.details);

router.get('/create', controller.create);
router.post('/create', controller.createPost);

module.exports = router;
