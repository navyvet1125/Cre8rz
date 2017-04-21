var mongoose = require('mongoose');
var User = require('./user');

var Portfolio = new mongoose.Schema({
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	name: {type:String, default:'No Name'},
	description: String,
	created: {type:Date, default: Date.now()},
	modified: Date,
	//Types of portfolios.  Showcase is the default setting.
	
	type: {type: 'String', enum:[
		'working',
		'showcase',
		'assessment',
		'hybrid'
	],default:'showcase'},
	//Purpose for the portfolio.  None is the default setting.
	purpose: {type: 'String', enum:[
		'none',
		'modeling',
		'writing',
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
	],default:'none'},
});
