const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.get('/login', controller.login);
router.get('/signup', controller.signup);
router.get('/logout', controller.logout);
router.post('/authentication', controller.authentication);
router.post('/signup', controller.signupPost);

module.exports = router;
