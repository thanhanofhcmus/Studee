const express = require('express');
const router = express.Router();
const controller = require('../controllers/profile');

router.get('/', controller.list);
router.get('/edit', controller.edit);
router.post('/update', controller.update);
module.exports = router;
