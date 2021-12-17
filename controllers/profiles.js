const profiles = require('../models/profiles');

module.exports.list = (req, res) => {
  console.log(profiles);
  res.render('profiles', { profiles });
};
