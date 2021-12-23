const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeworks');
const formidable = require('express-formidable');
const fs = require('fs');
const path = require('path');

router.use(formidable());
router.get('/', controller.list);
router.post('/', (req, res, next) => {
  res.send(res.files);
});
router.get('/homework-update', (req, res) => {
  res.render('homework/homework-update', { title: 'Homework' });
});

module.exports = router;
