const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const User = require('./user')
const Comment = require('./comment')

const eventSchema = new mongoose.Schema({
	//The purpose of this model is to enable artists to promote themselves using the site
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //Creator objectId
	title: String,												  //Title of the Event
	description: String,										  //Text Description
	when: {type: Date, required: true},							  //Date and time of the event
	location: String,											  //Where the event will be.  Stringified JSON
	created: {type: Date, default: Date.now()},					  //When it was created
	modified: Date,												  //Date when modified
	attendees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], //list of people attending
	likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],  //People who like the entry
	comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
	approved: {type: Boolean, default: false}  					  //If the entry is approved
})

eventSchema.statics.findByCreator = (creator, cb) => this.find({creator: creator}, cb)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event