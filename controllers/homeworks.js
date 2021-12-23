const homeworks = require('../models/homeworks');

module.exports.list = (req, res) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const renderHomeworks = homeworks.map(homework => ({
    ...homework,
    month1: months[homework.opened.getMonth()],
    month2: months[homework.due.getMonth()]
  }));
  res.render('homework/homeworks', { title: 'Homeworks', homeworks: renderHomeworks });
};
