const User 				= require('../models/user')
const FacebookStrategy	= require('passport-facebook').Strategy
const GoogleStrategy 	= require('passport-google-oauth2').Strategy
const LocalStrategy 	= require('passport-local').Strategy
// Wrap it in a function to make it callable
module.exports = passport => {
	passport.serializeUser( (user,done) => done(null, user.id))
	passport.deserializeUser((id,done) => User.findById(id, (err,user) => done(err, user)))
	// Login with email address and password
	passport.use('local',new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		(username, password, done) => {
		    User.findOne({ email: username }, (err, user) => {
		      if (err) return done(err)
		      if (!user) return done(null, false)
		      else user.verifyPassword(password, (err,result) => {
		      	if(err) return done (err)
		      	if(result) return done(null, user)
		      	else return done(null,false)
		      })
		    })
		}
	))

	// Login through Google 
	passport.use('google', new GoogleStrategy({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL+'/',
			passReqToCallback: true,
		}, 
		(request, accessToken, refreshToken, profile, done) => {
	  		User.findOne({'email': profile.emails[0].value}, (err, user) => {
			    if (err) return done(err)
			    if (user) {
			    	//If the Google avatars are different  and there is no FB avatar then update user avatar
			    	if(user.google_avatar!==profile.photos[0].value && !user.fb_avatar){
			    		user.google_avatar=profile.photos[0].value
			    		user.save();
			    	}
			        return done(null, user);
				} else {
					const newUser = new User({
						id: profile.id,
						google_access_token : accessToken,
						name : profile.displayName,
						email : profile.emails[0].value,
						google_avatar : profile.photos[0].value
					})
					newUser.save()
						.then(() =>{done(null, newUser)})
						.catch( err => { throw err})
				}
			})
	}))

	  // Login through Facebook.
		passport.use('facebook', new FacebookStrategy({
			clientID: process.env.FACEBOOK_API_KEY,
			clientSecret: process.env.FACEBOOK_API_SECRET,
			callbackURL: process.env.FACEBOOK_APP_URL,
			enableProof: true,
			profileFields: ['id', 'name','picture.type(large)', 'emails']
		}, 
		(access_token, refresh_token, profile, done) => {
			process.nextTick(() => {
				User.findOne({'email': profile.emails[0].value}, (err,user) => {
					if(err) return done(err);
					if(user) {
						//If the FB avatars are different and there is no Google avatar then update avatar
						if(user.fb_avatar!==profile.photos[0].value && !user.google_avatar){
							user.fb_avatar=profile.photos[0].value
							user.save()
						}
						return done(null, user)
					} else {
						const newUser = new User({
							id : profile.id,
							fb_access_token : access_token,
							name : profile.name.givenName + ' ' + profile.name.familyName,
							email : profile.emails[0].value,
							fb_avatar : profile.photos[0].value
						})
						newUser.save()
							.then(() =>{done(null, newUser)})
							.catch( err => { throw err})
						}
				})
			})
		}))
}