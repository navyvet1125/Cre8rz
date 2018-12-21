const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const User = require('./user');
const materializedPlugin = require('mongoose-materialized')


const commentSchema = new mongoose.Schema({
	// A model for comments.  
	subject: {type: mongoose.Schema.Types.ObjectId, required: true},				//what is being commented on
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},	//Who created the comment.
	created: {type: Date, default: Date.now()},										//When the comment was created.
	modified: Date,																	//When the comment was modified.
	likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],  					//People who like the comment.
	body: String,																	//The body of the comment.
	isReply: {type: Boolean, default: false}										//Is this comment a reply to an earlier comment?
})

commentSchema.plugin(materializedPlugin)

commentSchema.statics.findByCreator = (creator, cb) => this.find({creator: creator}, cb)

commentSchema.statics.findBySubject = (subject, cb) => this.find({subject: subject}, cb)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment