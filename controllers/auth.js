// display login page
const login = (req, res) => {
  res.render('auth/login', { title: 'Đăng nhập' });
};

// display signup page
const signup = (req, res) => {
  res.render('auth/signup', { title: 'Đăng kí', wrongPassword2: req.query.wrongPassword2 });
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

  // con.query(
  //   'SELECT * FROM User WHERE username = ? AND password = ?',
  //   [username, password],
  //   (err, rows, fields) => {
  //     if (err) {
  //       throw err;
  //     }
  //     // if user not found
  //     if (rows.length <= 0) {
  //       req.flash('error', 'Vui lòng nhập lại username hoặc password');
  //       res.redirect('/auth/login');
  //     } else { // if user found
  //       req.session.loggedIn = true;
  //       // TODO: update to get these from DB
  //       res.redirect('/');
  //     }
  //   });
};

const signupPost = async (req, res) => {
  const { username, password, password2 } = req.body;
  if (password !== password2) {
    res.redirect('/auth/signup?wrongPassword2');
  }
};

module.exports = {
  login,
  signup,
  logout,
  authentication,
  signupPost
};
