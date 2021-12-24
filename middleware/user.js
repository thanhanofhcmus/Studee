module.exports = (req, res, next) => {
  const { loggedIn, localsUser } = req.session;
  res.locals = { ...res.locals, loggedIn, user: localsUser };
  if (req.session.loggedIn) {
    res.locals.coursesLink = `/${localsUser.isTeacher ? 'teachers' : 'undefined'}/courses/list`;
  }
  next();
};
