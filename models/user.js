var mongoose 	= require('mongoose');
var Activity	= require('./activity');
var Portfolio 	= require('./portfolio');
var Event		= require('./event');


var userSchema  = new mongoose.Schema({
	//Artist is someone who uses the website for their portfolio.
	//Visitors are people who have accounts but do not keep their portfolios on the site
	//Admin users can add or remove anyone, change anyone's type, and can add,
	//approve, or remove causes.  
	type: {type: 'String', enum: [
	    'artist',
	    'visitor', 
	    'admin' 
	], default:'visitor'},
	//User Mutable
	career: {type:String, default:'none'},
	name: {type: String, required:true},
	bio: String,														// Information about the artist
	city: String,
	//User status
	status: String,
	password: String,
	//User Immutable
	login: {type: String, unique: true, required: true},
	fb_avatar: String,
	google_avatar: String,
	email: {type: String, unique:true, required: true},
	created: {type: Date, default: Date.now()},							//When the user was created
	modified: Date,														//When the user last updated their profile
	lastLogin: Date,
	fb_access_token: String,
	google_access_token: String,
	// A list of followers the artist has.  An array of User Id's
	followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate:true}],
	//A list of all events the artist is attending.
	attending: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event', autopopulate:true}],
	approved: {type: Boolean, default: false},  					  //If the profile is approved
	active: {type: Boolean, default: true}  					  //If the profile is active
});
userSchema.plugin(require('mongoose-bcrypt'));
userSchema.plugin(require('mongoose-autopopulate'));
//search users by type
userSchema.statics.findByType = function(type, cb){
	return this.find({type: type}, cb);
};
//Search users by career
userSchema.statics.findByCareer = function(career, cb){
	return this.find({career: career}, cb);
};
//Search users by Email
userSchema.statics.findByEmail = function(email, cb){
	return this.findOne({email: email}, cb);
};

//Search to see if the user is of a certain type.
userSchema.statics.searchNameAndType = function(name, type, cb){
	this.find({type: type}, function(err, users){
		if(err) return err;
		var person;
		users.forEach(function(user){
			if(user.name.toLowerCase() === name.toLowerCase())person = user;
		});
		return cb(err, person);
	});
};

userSchema.pre('save',function(next){
	//If there is a change to an already created user, then generate a new activity.
	if(!this.isNew && (this.isModified('career')||this.isModified('city')||this.isModified('bio')||this.isModified('name'))){
		this.activity = new Activity();
		// Activity needs: picture, title, body, receivers
		this.activity.name = this.name;
		this.activity.picture = (this.fb_avatar)? this.fb_avatar: this.google_avatar;
		this.activity.title = '<b>'+this.name + '</b> has updated their profile.';
		this.activity.receivers = this.followers;
		this.activity.receivers.unshift(this._id);
	} else if(this.isNew){
		this.portfolio = new Portfolio({
			creator: this,
			name: this.name+'\'s Portfolio.',
			description: this.name+'\'s Portfolio.'
		});
	}
	next();
});

userSchema.post('save', function(doc){
	if(this.activity) {
		this.activity.save()
		.then(function(activity){
			delete this.activity;
		});
	}
	if(this.portfolio) {
		this.portfolio.save()
		.then(function(portfolio){
			delete this.portfolio;
		});
	}
});

var User = mongoose.model('User', userSchema);

module.exports = User;