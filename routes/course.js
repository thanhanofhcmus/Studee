const express = require('express');
const router = express.Router();
const controller = require('../controllers/courses');

router.get('/', controller.list);
router.get('/list', controller.list);
router.get('/list-of-user/:id', controller.listOfUser);

router.get('/details/:id', controller.details);

router.get('/create', controller.create);
router.post('/create', controller.createPost);

router.get('/delete/:id', controller.remove);

router.get('/edit/:id', controller.edit);
router.post('/edit/:id', controller.editPost);

router.get('/participate/:id', controller.participate);
router.get('/leave/:id', controller.leave);

module.exports = router;
