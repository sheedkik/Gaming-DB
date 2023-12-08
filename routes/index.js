var express = require('express');
var router = express.Router();
const passport = require("passport")
const User = require('../models/user')


router.get('/', function(req, res, next) {
  console.log("session User:", req.user)
  res.redirect("/games")
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/games',
    failureRedirect: '/movies'
  }
));

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/games');
  });
});

module.exports = router;
