const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const User = require('./user')
const Entry = require('./entry')

const portfolioSchema = new mongoose.Schema({
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	entries: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}],
	name: {type:String, default:'No Name'},
	description: String,
	//If portfolio is a sub-directory.
	created: {type:Date, default: Date.now()},
	modified: Date,
	//Purpose of the portfolios.  Showcase is the default setting.
	purpose: {type: String, enum:['working', 'showcase', 'assessment', 'hybrid'],default:'showcase'},
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
})

portfolioSchema.statics.findByCreator = (creator, cb) => this.find({creator:creator}, cb)

portfolioSchema.statics.findByType = (type, cb) => this.find({type:type}, cb)

portfolioSchema.statics.findByPurpose = (purpose, cb) => this.find({purpose:purpose}, cb)

portfolioSchema.statics.findByName = (name, cb) => this.find({name:name}, cb)

const Portfolio = mongoose.model('Portfolio', portfolioSchema)
module.exports = Portfolio