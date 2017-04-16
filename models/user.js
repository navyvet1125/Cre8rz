var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	//Artist is someone who uses the website for their portfolio.
	//Visitors are people who have accounts but do not keep their portfolios on the site
	//Admin users can add or remove anyone, change anyone's type, and can add,
	//approve, or remove causes.  
	type: {type: 'String', enum: [
	    'artist',
	    'visitor', 
	    'admin' 
	], default:'visitor'},
	//User career types.  Artist is the default setting.
	career: {type: 'String', enum:[
		'Modeling',
		'Writing',
		'Advertising Creative',
		'Photographer',
		'Graphic Designer',
		'Website Designer',
		'Make-up Artist',
		'Artist',
		'Interior Designer',
		'Videographer',
		'Cake Decorator',
		'Video Game Designer',
		'Computer Programmer'
	],default:'Artist'}
	name: {type: String, required:true},
	avatar: String,
	email: {type: String, unique:true, required: true},
	city: String,
	fb_access_token: String,
	bio: String,
});

//search users by type
userSchema.statics.findByType = function(type, cb){
	return this.find({type: type}, cb);
};

userSchema.statics.findByCareer = function(career, cb){
	return this.find({career: career}, cb);
};

userSchema.statics.findByEmail = function(email, cb){
	return this.findOne({email: email}, cb);
};

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

userSchema.statics.findWithId = function(id, cb){
	var currentPledges;
	var currentUser;
	return this.findById(id)
			.then(function(user){
				currentUser = user;
				return Pledge.find({user: id});
			}).then(function(pledges){
				currentPledges = pledges;
				return Cause.find({creator: id});
			}).then(function(causes){
				currentUser.pledges = currentPledges.length;
				currentUser.causes = causes.length;
				return currentUser.save();
			}).then(cb);
};


userSchema.statics.findPledgesById = function(id, cb){
	return Pledge.find({user: id}, cb);
};

userSchema.statics.findCausesById = function(id, cb){
	return Cause.find({creator: id}, cb);
};

userSchema.statics.findCausesByPledgesById = function(id, cb){
	return Pledge.find({user: id})
		.then(function(pledges){
			var causes =[];
			pledges.forEach(function(pledge){
				causes.push( pledge.cause);
			});
			return Cause.find({'_id': { $in: causes}});
		});
};


var User = mongoose.model('User', userSchema);

module.exports = User;