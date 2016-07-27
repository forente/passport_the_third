var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

var session = require('express-session');
var User = require('./models/user');

var app = express();

var mongoURI = 'mongodb://localhost:27017/demo_register';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
   console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
 console.log('mongodb connection open');
});

app.use(session({
  secret:'secret',
  key:'user',
  resave:true,
  saveUninitialized: false,
  cookie:{ maxAge:60000, secure:false}
}));

var localStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy({ passReqToCallback: true, usernameField: 'username'},
  function(req, username, password, done ){
    //TODO :
    User.findOne({username: username}, function(err,user){
      if(err){
        throw err;
      }

      if (isMatch){
        return done(null, user);
      }
      else {
        doen(null, false, {message: 'Incorrect username and password.'});
      }
    });
  })
);

passport.serializedUser(function(user, done){
  done(null, user.id);
});

passport.serializedUser(function(user, done){
  User.findById(id, function(err, user){
    if(err){
      return done(err);
    }
    done(null, user);
  });
});



var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listining on port:', port);
});
