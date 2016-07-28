var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

var session = require('express-session');
var User = require('./models/user');
var login = require('./routes/login');
var register = require('./routes/register');

var app = express();

var mongoURI = 'mongodb://localhost:27017/demo_register';
var MongoDB = mongoose.connect(mongoURI).connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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
      if(!user){
        return done(null, false, {message: 'Incorrect username or password.'});
      }
      //test a ma
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          throw err;
        }

        if (isMatch) {
          return done(null, user);
        } else {
          done(null, false, { message: 'Incorrect username and password.' });
        }
      });
    });
  })
);

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(user, done){
  User.findById(id, function(err, user){
    if(err){
      return done(err);
    }
    done(null, user);
  });
});

app.use(express.static('public'));

app.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, 'public/views/login.html'));
});

app.use('/register', register);
app.use('/login', login);



var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listining on port:', port);
});
