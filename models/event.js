var mongoose = require('mongoose');
var User = require('./user');
var Comment = require('./comment');

var eventSchema = new mongoose.Schema({
	//The purpose of this model is to enable artists to promote themselves using the site
	title: String,												  //Title of the Event
	description: String,										  //Text Description
	when: {type: Date, required: true},							  //Date and time of the event
	createdAt: Date,											  //Date the entry was created
	location: String,											  //Where the event will be
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //Creator objectId
	attendees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], //list of people attending
	likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],  //People who like the entry
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}], //List of comments
	approved: {type: Boolean, default: false}  					  //If the entry is approved
});

eventSchema.statics.findByCreator = function(creator, cb){
	return this.find({creator: creator}, cb);
};

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;