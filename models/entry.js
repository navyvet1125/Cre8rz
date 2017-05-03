var mongoose = require('mongoose');
var Portfolio = require('./portfolio');
var User = require('./user');
var Comment = require('./comment');

var entrySchema = new mongoose.Schema({
	creator:  {type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true}, //Creator objectId
	portfolio: {type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio', autopopulate:true}, //Portfolio objectId
	title: String,												  //Title of the Entry
	url: String,												  //Url if applicable
	description: String,										  //Text Description
	// content: String,											  //stringified JSON object w/'src' for text/picture src and 'desc' for caption
	content: [new mongoose.Schema(
		{
			src: String,
			desc: String,
			_id:false 
		})],											  		// JSON object w/'src' for text/picture src and 'desc' for caption
	category: {type: 'String', enum: [
	    'text',
	    'audio',
	    'videos', 
	    'pictures' 
	], default:'pictures'},										  //Type of Entry
	created: {type: Date, default: Date.now()},					  //When it was made
	modified: Date,												  //When the entry was modified.
	likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],  //People who like the entry
	comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'Comment', autopopulate: true}],
	approved: {type: Boolean, default: true}  					  //If the entry is approved
});
entrySchema.plugin(require('mongoose-autopopulate'));

entrySchema.statics.findByCategory = function(category, cb){
	return this.find({category: category}, cb);
};

entrySchema.statics.findByPortfolio = function(portfolio, cb){
	return this.find({portfolio: portfolio}, cb);
};

var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;