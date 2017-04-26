var mongoose = require('mongoose');
var User 	 = require('./user');

var activitySchema = new mongoose.Schema({
	//New information for the news feeds.
	//Date includes when the  activity was created,
	//the profile picture of the person who the activity tracks,
	//the title of the activity,
	//the body of the activity,
	//and on whose feeds the activity will post.
	created: {type: Date, default: Date.now()},
	picture: String,
	title: String,
	body: String,
	receivers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;