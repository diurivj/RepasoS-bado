const passport         = require('passport');
const FacebookStrategy = require('passport-facebook');
const User             = require('../models/User');

passport.use(new FacebookStrategy({
  clientID: "252677848656567",
  clientSecret: "6c1612b07641e2b74628948153e7b495",
  callbackURL: "http://localhost:3000/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.create({ username: profile.displayName }, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
}
));

passport.serializeUser(function(user,cb){
  cb(null, user)
});

passport.deserializeUser(function(user,cb){
  cb(null, user)
})  

module.exports = passport;