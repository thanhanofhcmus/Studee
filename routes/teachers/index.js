const coursesRouter = require('./courses');
const router = require('express').Router();

const handleId = (req, res, next) => {
  res.locals.teacherId = req.params.id;
  next();
};

router.use('/:id/courses', handleId, coursesRouter);

module.exports = router;
