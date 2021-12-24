module.exports = (req, res, next) => {
  const { loggedIn, user } = res.locals;
  if (!loggedIn) {
    res.send('Not logged in');
  } if (user && !user.isTeacher) {
    res.send('User is not a teacher');
  } else {
    next();
  }
};
