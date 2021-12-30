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
const authentication = async (req, res) => {
  const { username, password } = req.body;

  try {
    const rows = await usersModel.findByUsername(username);
    const dbUser = rows[0];
    if (dbUser.password !== password) {
      res.redirect('/auth/login?passwordWrong');
    } else {
      req.session.loggedIn = true;
      req.session.localsUser = {
        ...dbUser,
        name: dbUser.username,
        isTeacher: dbUser.userType === usersModel.USER_TYPE_TEACHER
      };
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.redirect('/auth/login?somethingWrong');
  }
};

const signupPost = async (req, res) => {
  const user = req.body;

  if (user.password !== user.retype) {
    res.redirect('/auth/signup?wrongRetype');
    return;
  }
  try {
    const rows = await usersModel.findByUsername(user.username);
    if (rows.length !== 0) {
      res.redirect('/auth/signup?usernameExists');
    } else {
      user.gender = user.gender === 'male' ? usersModel.GENDER_MALE : usersModel.GENDER_FEMALE;
      user.userType = user.userType === 'teacher' ? usersModel.USER_TYPE_TEACHER : usersModel.USER_TYPE_STUDENT;
      await usersModel.insert(user);
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.redirect('/auth/signup?somethingWrong');
  }
};

module.exports = {
  login,
  signup,
  logout,
  authentication,
  signupPost
};
