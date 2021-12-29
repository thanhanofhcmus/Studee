const router = require('express').Router();
const model = require('../models/user');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/test', (req, res) => {
  model.insert({
    username: 'test',
    password: '123156',
    email: 'email@example.com',
    firstName: 'first',
    lastName: 'last',
    gender: 1,
    typeUser: 1
  }, (err, rows) => res.send('err' + err || rows));
});

module.exports = router;
