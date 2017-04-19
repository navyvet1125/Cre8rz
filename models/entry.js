var mongoose = require('mongoose');
var User = require('./user');
var Comment = require('./comment');

var entrySchema = new mongoose.Schema({
	title: String,												  //Title of the Entry
	url: String,												  //Url if applicable
	description: String,										  //Text Description
	content: [String],											  //An array of strings holding either text or url
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //Creator objectId
	category: {type: 'String', enum: [
	    'text',
	    'audio',
	    'videos', 
	    'pictures' 
	], default:'pictures'},										  //Type of Entry
	created: {type: Date, default: Date.now()},					  //When it was made
	modified: Date,												  //When the entry was modified.
	likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],  //People who like the entry
	approved: {type: Boolean, default: false}  					  //If the entry is approved
});

entrySchema.statics.findByCategory = function(category, cb){
	return this.find({category: category}, cb);
};

entrySchema.statics.findByCreator = function(creator, cb){
	return this.find({creator: creator}, cb);
};

var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;