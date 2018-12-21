const mongoose 	= require('mongoose')
mongoose.Promise = require('bluebird')
const Activity	= require('./activity')
const Portfolio 	= require('./portfolio')
const Event		= require('./event')


const userSchema  = new mongoose.Schema({
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
	followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	//A list of all events the artist is attending.
	attending: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
	approved: {type: Boolean, default: false},  					  //If the profile is approved
	active: {type: Boolean, default: true}  					  //If the profile is active
})
userSchema.plugin(require('mongoose-bcrypt'))
//search users by type
userSchema.statics.findByType = (type, cb) => this.find({type: type}, cb)
//Search users by career
userSchema.statics.findByCareer = (career, cb) => this.find({career: career}, cb)
//Search users by Email
userSchema.statics.findByEmail = (email, cb) => this.findOne({email: email}, cb)

//Search to see if the user is of a certain type.
userSchema.statics.searchNameAndType = (name, type, cb) => {
	this.find({type: type})
	.then( users => cb(null, users.filter(user => user.name.toLowerCase() === name.toLowerCase)))
	.catch( err => cb(err, null))
}

userSchema.pre('save',function(next) {
	//If there is a change to an already created user, then generate a new activity.
	if(!this.isNew && (this.isModified('career')||this.isModified('city')||this.isModified('bio')||this.isModified('name'))){
		this.activity = new Activity({
			name: this.name,
			picture:(this.fb_avatar)? this.fb_avatar: this.google_avatar,
			title: '<b>'+this.name + '</b> has updated their profile.',
			recievers: this.followers.concat(this._id)
		})
		this.activity.save()
	} else if(this.isNew){
		this.portfolio = new Portfolio({
			creator: this,
			name: this.name+'\'s Portfolio.',
			description: this.name+'\'s Portfolio.'
		})
		this.portfolio.save()
	}
	next()
})

userSchema.post('save', (doc) => {
	//if there is an activity or a portfolio, save it(them) then delete the original(s).
	if(this.activity) this.activity.save().then((activity) => delete this.activity)
	if(this.portfolio) this.portfolio.save().then((portfolio) => delete this.portfolio)
})

const User = mongoose.model('User', userSchema)

module.exports = User