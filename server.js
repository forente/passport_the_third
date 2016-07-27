var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

var session = require('express-session');

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
  }
));

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listining on port:', port);
});
