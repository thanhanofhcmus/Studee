const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.get('/login', controller.login);
router.post('/login', controller.loginPost);

router.get('/signup', controller.signup);
router.post('/signup', controller.signupPost);

router.get('/logout', controller.logout);

router.get('/delete-account', controller.deleteAccount);
router.post('/delete-account', controller.deleteAccountPost);

module.exports = router;
