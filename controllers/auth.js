const con = require('../models/database');

// display login page
const login = (req, res) => {
  res.render('auth/login', { title: 'Đăng nhập' });
};

// display signup page
const signup = (req, res) => {
  res.render('auth/signup', { title: 'Đăng kí' });
};

const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.localsUser = undefined;
  res.redirect('/');
};

// authentication-post
const authentication = (req, res) => {
  const { username, password } = req.body;

  // TODO: this is for testing, remove this
  req.session.loggedIn = true;
  req.session.localsUser = {
    id: 'TCH1',
    name: username,
    isTeacher: true
  };
  res.redirect('/');
  return;

  /* eslint-disable no-unreachable */
  con.query(
    'SELECT * FROM User WHERE username = ? AND password = ?',
    [username, password],
    (err, rows, fields) => {
      if (err) {
        throw err;
      }
      // if user not found
      if (rows.length <= 0) {
        req.flash('error', 'Vui lòng nhập lại username hoặc password');
        res.redirect('/auth/login');
      } else { // if user found
        req.session.loggedIn = true;
        // TODO: update to get these from DB
        res.redirect('/');
      }
    });
  /* eslint-disable no-unreachable */
};

// signup-post
const signupPost = async (req, res) => {
  // req.assert('username', 'Username phải được nhập').notEmpty();
  // req.assert('password', 'Password phải được nhập').notEmpty();
  // req.assert('password2', 'Phải nhập lại mật khẩu').notEmpty();
  // const errors = req.validationErrors();

  // if (!errors) {
  //   const user = {
  //     username: req.sanitize('username').escape.trim(),
  //     password: req.sanitize('password').escape.trim(),
  //     password2: req.sanitize('password2').escape.trim()
  //   };
  // }
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  console.log(user);
  if (req.body.password === req.body.password2) {
    con.query('INSERT INTO User SET ?', user, function (err, result) {
      if (err) {
        req.flash('error', err);
        // res.render('auth/signup', { title: 'Đăng kí', username: '', password: '', password2: '' });
      } else {
        req.flash('success', 'Bạn đã đăng kí tài khoản thành công!');
        res.redirect('/auth/login');
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
