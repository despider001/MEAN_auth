const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  res.json({user: req.user});
});

module.exports = router;
