var mongoose = require('mongoose');
var User = require('./user');

var messageSchema = new mongoose.Schema({
	sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},		//Who sent it?
	receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},		//Who is it for?
	subject: {type: String, default: 'No Subject'},						//subject
	body: String,														//Content of the message
	created: {type: Date, default: Date.now()},							//When it was made
	read: Date,															//When it was read
	replyTo:{type: mongoose.Schema.Types.ObjectId, ref: 'Message'},		//What this message is a reply to.
	forwardOf:{type: mongoose.Schema.Types.ObjectId, ref: 'Message'},	//What this message is a forward of.
	trashed: Date,														//If and when the message was marked as trash.
	hidden: Date														//If and when the sender trashed the message.
});

messageSchema.statics.findBySender = function(sender, all, cb){				//Find messages by sender
	// Note: If a callback is desired, a truthy or falsy argument must be passed beetween the sender ID and the callback.
	if(all) return this.find({sender:sender},cb);
	return this.find({
		sender: sender,
		hidden: undefined
	}, cb);
};

messageSchema.statics.findByReceiver = function(receiver, all, cb){			//Find messages by recipient
	// Note: If a callback is desired, a truthy or falsy argument must be passed beetween the receiver ID and the callback.
	if(all) return this.find({receiver:receiver},cb);
	return this.find({
		receiver: receiver,
		trashed: undefined
	}, cb);
};


var Message = mongoose.model('Message', messageSchema);

module.exports = Message;