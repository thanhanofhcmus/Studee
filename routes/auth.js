const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.get('/login', controller.login);
router.get('/signup', controller.signup);
router.post('/authentication', controller.authentication);
router.post('/signup-post', controller.signupPost);

module.exports = router;
