var mongoose = require('mongoose');
var Entry = require('./entry');
var User = require('./user');

var commentSchema = new mongoose.Schema({
	// A model for comments.  
	entry:{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'},  		//Which entry the comment is for.
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},		//Who created the comment.
	body: String,														//The body of the comment.
	replies:[{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],	//The replies to this comment.
	isReply: {type: Boolean, default: false}							//Is this comment a reply to an earlier comment?
});

commentSchema.statics.findByCreator = function(creator, cb){
	return this.find({creator: creator}, cb);
};

commentSchema.statics.findByEntry = function(entry, cb){
	return this.find({entry: entry}, cb);
};

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
