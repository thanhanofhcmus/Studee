const usersModel = require('../models/users');

// display login page
const login = (req, res) => {
  const { somethingWrong, usernameNotExists, passwordWrong } = req.query;
  res.render('auth/login', {
    title: 'Đăng nhập',
    somethingWrong,
    usernameNotExists,
    passwordWrong
  });
};

// display signup page
const signup = (req, res) => {
  res.render('auth/signup', { title: 'Đăng kí', wrongRetype: req.query.wrongRetype });
};

const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.localsUser = undefined;
  res.redirect('/');
};

// authentication-post
const authentication = (req, res) => {
  const { username, password } = req.body;

  usersModel.findByUsername(username, (err, rows) => {
    let redirectUrl = '/';
    if (err) {
      redirectUrl = '/auth/login?somethingWrong';
    } else if (rows.length === 0) {
      redirectUrl = '/auth/login?usernameNotExists';
    } else {
      const dbUser = rows[0];
      if (dbUser.password !== password) {
        redirectUrl = '/auth/login?passwordWrong';
      } else {
        req.session.loggedIn = true;
        req.session.localsUser = {
          ...dbUser,
          name: dbUser.username,
          gender: dbUser.gender,
          isTeacher: dbUser.userType === usersModel.USER_TYPE_TEACHER
        };
      }
    }
    res.redirect(redirectUrl);
  });
};

const signupPost = async (req, res) => {
  const user = req.body;

  if (user.password !== user.retype) {
    res.redirect('/auth/signup?wrongRetype');
  } else {
    usersModel.findByUsername(user.username, (err, rows) => {
      if (err) {
        res.send(err);
      } else if (rows.length !== 0) {
        res.redirect('/auth/signup?usernameExists');
      } else {
        usersModel.insert(user);
        res.redirect('/');
      }
    });
  }
};

module.exports = {
  login,
  signup,
  logout,
  authentication,
  signupPost
};
