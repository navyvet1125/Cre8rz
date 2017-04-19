var mongoose = require('mongoose');
var User = require('./user');

var messageSchema = new mongoose.Schema({
	sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},		//Who sent it?
	receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},		//Who is it for?
	subject: {type: String, default: 'No Subject'},						//subject
	body: String,														//Content of the message
	created: {type: Date, default: Date.now()},							//When it was made
	read: Date,															//When it was read
	replies:[{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],	//What replies if any
	isReply: {type: Boolean, default: false}							//Is this message a reply
});

messageSchema.statics.findBySender = function(sender, cb){				//Find messages by sender
	return this.find({sender: sender}, cb);
};

messageSchema.statics.findByReceiver = function(sender, cb){			//Find messages by recipient
	return this.find({sender: sender}, cb);
};


var Message = mongoose.model('Message', messageSchema);

module.exports = Message;