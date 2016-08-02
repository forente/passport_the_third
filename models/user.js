// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
var pg = require('pg');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;



// var UserSchema = new Schema({
//   username:{ type:String, required:true, index: {unique:true}},
//   password:{ type:String, required:true}
// });
//
var = config ={
  database: 'passport_db',
  port: 5432,
  max : 10,
  idleTimeoutMillis: 30000
}

var pool = new pg.Pool(config);

function findByUsername (username, callback){
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }
    client.query('SELECT * FROM users WHERE username=$1;',[username],function(err, result){
      if (err) {
        done();
        return callback(err);
      }

      callback(null, result.row[0]);
      done();

    })
  });
}

// UserSchema.pre('save',function(next){
//   var user = this;
//
//   // hashes  new passwords only
//   if (!user.isModified('password')){
//     return next();
//   }
//
//   // generates the salt
//    bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
//      if(err){
//        return next(err);
//      }
//
//     bcrypt.hash(user.password, salt, function(err,hash){
//       if(err){
//         return next(err);
//       }
//
//       // override cleartext
//       user.password = hash;
//       next();
//     });
//   });
// });


//
// UserSchema.methods.comparePassword = function (candidatePassword, cb){
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
//     if(err){
//       return cb(err);
//     }
//     cb(null,isMatch);
//   });
// };
//
// module.exports = mongoose.model('User',UserSchema);

module.exports = {
  findByUserName: findByUserName,
  findById:findById,
  create: create,
  findAndComparePassword:findAndComparePassword
}
