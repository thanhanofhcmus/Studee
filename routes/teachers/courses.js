const router = require('express').Router();
const controller = require('../../controllers/teachers/courses');

router.get('/', (req, res) => {
  res.send('Welcome Teacher/Courses id: ' + res.locals.teacherId);
});

router.get('/create', controller.create);
router.get('/update/:id', controller.update);

router.get('/list', controller.list);

router.get('/detail/:id', controller.detail);

router.post('/create', (req, res) => {
  res.send(req.body);
});

module.exports = router;
