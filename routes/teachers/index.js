const coursesRouter = require('./courses');
const router = require('express').Router();

const handleId = (req, res, next) => {
  // res.locals.teacherId = req.params.id;
  res.locals.teacherId = 'TCH1';
  next();
};

router.use('/courses', handleId, coursesRouter);

module.exports = router;
