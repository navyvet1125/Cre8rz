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
		User.findById(id, function(err,user){
			// console.log('deserializing user...');
			done(err, user);
		});
	});
// Login with email address and password
passport.use('local',new LocalStrategy({
   usernameField: 'email',
    passwordField: 'password'
},
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) return done(err); 
      if (!user) return done(null, false);
      else user.verifyPassword(password, function(err,result){
      	if(err) return done (err);
      	if(result) return done(null, user);
      	else return done(null,false);
      });
    });
  }
));

// Login through Google 
passport.use('google', new GoogleStrategy({
clientID: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,
callbackURL: process.env.GOOGLE_CALLBACK_URL+'/',
passReqToCallback: true,
}, function(request, accessToken, refreshToken, profile, done){
  User.findOne({'email': profile.emails[0].value}, function(err, user){
    if (err) return done(err);
    if (user) {
    	if(user.google_avatar!==profile.photos[0].value && !user.fb_avatar){
    		user.google_avatar=profile.photos[0].value;
    		user.save();
    	}
        return done(null, user);
	} else {
		var newUser = new User();
		newUser.id = profile.id;
		newUser.google_access_token = accessToken;
		newUser.name = profile.displayName;
		newUser.email = profile.emails[0].value;
		newUser.google_avatar = profile.photos[0].value;
		newUser.save(function(err){
			if (err) throw err;
			return done(null, newUser);
		});
	}
		});
}));

  // Login through Facebook.
	passport.use('facebook', new FacebookStrategy({
		clientID: process.env.FACEBOOK_API_KEY,
		clientSecret: process.env.FACEBOOK_API_SECRET,
		callbackURL: process.env.FACEBOOK_APP_URL,
		enableProof: true,
		profileFields: ['id', 'name','picture.type(large)', 'emails']
	}, function(access_token, refresh_token, profile, done){
		process.nextTick(function(){
			User.findOne({'email': profile.emails[0].value}, function(err,user){
				if(err) return done(err);
				if(user) {
					if(user.fb_avatar!==profile.photos[0].value && !user.google_avatar){
						user.fb_avatar=profile.photos[0].value;
						user.save();
					}
					return done(null, user);
				} else {
					var newUser = new User();
					newUser.id = profile.id;
					newUser.fb_access_token = access_token;
					newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
					newUser.email = profile.emails[0].value;
					newUser.fb_avatar = profile.photos[0].value;
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