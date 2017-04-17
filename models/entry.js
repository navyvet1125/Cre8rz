var mongoose = require('mongoose');
var User = require('./user');

var entrySchema = new mongoose.Schema({
	title: String,												  //Title of the Entry
	description: String,										  //Text Description
	content: [String],											  //An array of strings holding either text or url
	creatorName: String,										  //Creator Name
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //Creator objectId
	category: {type: 'String', enum: [
	    'text',
	    'audio',
	    'videos', 
	    'pictures' 
	], default:'pictures'},										  //Type of Entry
	createdAt: Date,											  //Date the entry was created
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