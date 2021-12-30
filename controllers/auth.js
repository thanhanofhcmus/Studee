const usersModel = require('../models/users');

// display login page
const login = (req, res) => {
  const { somethingWrong, passwordWrong, usernameNotExists } = req.query;
  res.render('auth/login', {
    title: 'Đăng nhập',
    somethingWrong,
    passwordWrong,
    usernameNotExists
  });
};

const loginPost = async (req, res) => {
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
        isTeacher: dbUser.userType === usersModel.USER_TYPE_TEACHER,
        password: null // for safety
      };
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.redirect('/auth/login?somethingWrong');
  }
};

const signup = (req, res) => {
  const { somethingWrong, retypeWrong, usernameExists } = req.query;
  res.render('auth/signup', {
    title: 'Đăng kí',
    somethingWrong,
    retypeWrong,
    usernameExists
  });
};

const signupPost = async (req, res) => {
  const user = req.body;

  if (user.password !== user.retype) {
    res.redirect('/auth/signup?retypeWrong');
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

const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.localsUser = undefined;
  res.redirect('/');
};

const deleteAccount = (req, res) => {
  const { somethingWrong, accountNotExists, passwordWrong } = req.query;
  res.render('auth/delete-account', {
    title: 'Xóa tài khoản',
    somethingWrong,
    passwordWrong,
    accountNotExists
  });
};

const deleteAccountPost = async (req, res) => {
  const username = res.locals.user.name;
  try {
    const rows = await usersModel.findByUsername(username);
    if (rows.length === 0) {
      res.redirect('/auth/delete-account?accountNotExists');
      return;
    }
    if (req.body.password !== rows[0].password) {
      res.redirect('/auth/delete-account?passwordWrong');
      return;
    }
    await usersModel.remove(username);
    res.redirect('/auth/logout');
  } catch (err) {
    console.error(err);
    res.redirect('/auth/delete-account?somethingWrong');
  }
};

module.exports = {
  login,
  loginPost,
  signup,
  signupPost,
  logout,
  deleteAccount,
  deleteAccountPost
};
