var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var LocalStrategy = require('passport-local').Strategy;
// Wrap it in a function to make it callable
var passportFunction = function(passport){
	passport.serializeUser( function(user,done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id,done){
		var newId;
		// Code to handle the diffences between facebook oauth1 and google oauth2 
		//oath1 id is a string id but oauth2 id is an object
		//mongoose needs a string for findById to work
		if(typeof id!=='string'){
			newId = id[0]._id;
		} else {
			newId = id;
		}
		User.findById(newId, function(err,user){
			console.log('deserializing user...');
			done(err, user);
		});
	});

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

	// // Login for Admissions.  
	// // WARNING, ONLY USERS SEEDED IN THE DB CAN LOGIN THROUGH GOOGLE
 //  passport.use('google', new GoogleStrategy({
 //    clientID: process.env.GOOGLE_CLIENT_ID,
 //    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
 //    callbackURL: process.env.GOOGLE_CALLBACK_URL,
 //    passReqToCallback: true,
 //  }, function(request, accessToken, refreshToken, profile, done){
 //      User.findOne({'ga_email': profile.emails[0].value}, function(err, user){
 //        if (err) {
 //          return done(err);
 //        } else {
 //          if (user) {
 //            return done(null, user);
 //          } else {
 //            return done(null, null);
 //          }
 //        }
 //      });
 //  }));

  // Login through Facebook.
	passport.use('facebook', new FacebookStrategy({
		clientID: process.env.FACEBOOK_API_KEY,
		clientSecret: process.env.FACEBOOK_API_SECRET,
		callbackURL: process.env.FACEBOOK_APP_URL+'/',
		enableProof: true,
		profileFields: ['id', 'name','picture.type(large)', 'emails']
	}, function(access_token, refresh_token, profile, done){
		process.nextTick(function(){
			User.findOne({'email': profile.emails[0].value}, function(err,user){
				if(err) return done(err);
				if(user) {
					if(user.avatar!==profile.photos[0].value){
						user.avatar=profile.photos[0].value;
						user.save();
					}
					return done(null, user);
				}
				else {
					var newUser = new User();
					newUser.id = profile.id;
					newUser.fb_access_token = access_token;
					newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
					newUser.email = profile.emails[0].value;
					newUser.avatar = profile.photos[0].value;
					newUser.role ='new User';
					newUser.save(function(err){
						if (err) throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));
};

module.exports = passportFunction;