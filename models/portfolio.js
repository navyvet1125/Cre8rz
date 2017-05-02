var mongoose = require('mongoose');
var User = require('./user');
var Entry = require('./entry');
var materializedPlugin = require('mongoose-materialized');

var portfolioSchema = new mongoose.Schema({
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	entries: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}],
	name: {type:String, default:'No Name'},
	description: String,
	//If portfolio is a sub-directory.
	created: {type:Date, default: Date.now()},
	modified: Date,
	//Purpose of the portfolios.  Showcase is the default setting.
	purpose: {type: String, enum:[
		'working',
		'showcase',
		'assessment',
		'hybrid'
	],default:'showcase'},
	//Type of portfolio.  misc is the default setting.
	type: {type: String, enum:[
		'misc',
		'modeling',
		'writing',
		'acting',
		'advertising',
		'photographer',
		'graphic',
		'website',
		'make-up',
		'artist',
		'drawing',
		'sculpture',
		'pottery',
		'glass',
		'painting',
		'interior',
		'videographer',
		'cake',
		'game',
		'programmer',
		'fasion',
		'poetry',
		'other'
	],default:'misc'},
});
portfolioSchema.plugin(materializedPlugin);

portfolioSchema.statics.findByCreator = function(creator, cb){
	return this.find({creator:creator}, cb);
};

portfolioSchema.statics.findByType = function(type, cb){
	return this.find({type:type}, cb);
};

portfolioSchema.statics.findByPurpose = function(purpose, cb){
	return this.find({purpose:purpose}, cb);
};

portfolioSchema.statics.findByName = function(name, cb){
	return this.find({name:name}, cb);
};


var Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;