var router = require('express').Router();
var passport = require('passport');
var path = require('path');

// set up the root directory when the page loads
router.get("/", function(req, res){
  res.sendFile(path.resolve(__dirname, '../views/login.html'));
});

router.get('/', function(req, res, next){
  res.send(req.isAuthenticated());
});

// routes the the visitors to a success or failure page after posting
  router.post('/', passport.authenticate('local',{
    successRedirect:'/views/success.html',
    failureRedirect:'/views/failure.html'
  })
);

// takes all the info in router and exports it
module.exports = router;
