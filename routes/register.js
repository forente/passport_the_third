var router = require('express').Router();
var passport = require('passport');
var path = require('path');

var User = require('../models/user');

//gets the request page when the page loaded
router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public/views/register.html'));
});

// creates a new user with the info in the post
router.post('/', function(req, res, next){
  console.log(req.body);
  User.create(req.body, function(err, post){

    if(err){
      next(err);
    }
    else {
      // the user is registered but not authenticated
      // send them bac to get authenticated
      res.redirect('/');
    }
  })
})

module.exports = router;
