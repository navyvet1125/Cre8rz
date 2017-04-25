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

messageSchema.statics.findBySender = function(sender, type, cb){				//Find messages by sender
	// Note: Will default to sending only unhidden messages.
	if(type==='all') {
		return this.find({sender:sender},cb);
	}
	else if(type==='new'){
		return this.find({
			sender: sender, 
			hidden: undefined, 
			read: undefined
		},cb);
	}
	else return this.find({
		sender: sender,
		hidden: undefined
	}, cb);
};

messageSchema.statics.findByReceiver = function(receiver, type, cb){			//Find messages by recipient
	// Note: Will default to sending only messages that were not trashed.
	if(type==='all') {
		return this.find({receiver:receiver},cb);
	}
	else if(type==='new'){
		return this.find({
			receiver:receiver, 
			trashed: undefined, 
			read: undefined
		},cb);
	}
	else return this.find({
		receiver: receiver,
		trashed: undefined
	}, cb);
};

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;