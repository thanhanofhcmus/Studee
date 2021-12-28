const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('stringee');
});

module.exports = router;
