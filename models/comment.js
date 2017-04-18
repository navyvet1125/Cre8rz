var mongoose = require('mongoose');
var Entry = require('./entry');
var Event = require('./event');
var User = require('./user');

var commentSchema = new mongoose.Schema({
	// A model for comments.  
	subject:{type: mongoose.Schema.Types.ObjectId, required: true},		//what is being commented on
	// entry:{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'},  		//Which entry the comment is for.
	// event:{type: mongoose.Schema.Types.ObjectId, ref: 'Event'},  		//Which event the comment is for.
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},		//Who created the comment.
	body: String,														//The body of the comment.
	replies:[{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],	//The replies to this comment.
	isReply: {type: Boolean, default: false}							//Is this comment a reply to an earlier comment?
});

commentSchema.statics.findByCreator = function(creator, cb){
	return this.find({creator: creator}, cb);
};

commentSchema.statics.findBySubject = function(subject, cb){
	return this.find({subject: subject}, cb);
};

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
