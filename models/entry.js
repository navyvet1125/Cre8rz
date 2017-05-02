var mongoose = require('mongoose');
var Portfolio = require('./portfolio');
var materializedPlugin = require('mongoose-materialized');

var entrySchema = new mongoose.Schema({
	portfolio: {type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio'}, //Portfolio objectId
	title: String,												  //Title of the Entry
	url: String,												  //Url if applicable
	description: String,										  //Text Description
	content: String,											  //stringified JSON object w/'src' for text/picture src and 'desc' for caption
	category: {type: 'String', enum: [
	    'text',
	    'audio',
	    'videos', 
	    'pictures' 
	], default:'pictures'},										  //Type of Entry
	created: {type: Date, default: Date.now()},					  //When it was made
	modified: Date,												  //When the entry was modified.
	likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],  //People who like the entry
	approved: {type: Boolean, default: true}  					  //If the entry is approved
});
entrySchema.plugin(materializedPlugin);

entrySchema.statics.findByCategory = function(category, cb){
	return this.find({category: category}, cb);
};

entrySchema.statics.findByPortfolio = function(portfolio, cb){
	return this.find({portfolio: portfolio}, cb);
};

var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;