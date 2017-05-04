var Message = require('../models/message');
var controller ={};

controller.index = function(req, res) {
	// Returns listing of all non-trashed messages by receiver
	// Note: If a callback is desired, a truthy or falsy argument must be passed beetween the receiver ID and the callback.
	Message.findByReceiver(req.user._id)
		.then(function(messages){
			//if it worked
			res.status(200).render('message',{title: 'PortHole - Messages', messages: messages, user: req.user});
		})
		.catch(function(err){
			//if it didn't
			res.status(500).send(err);
		});
};
controller.sent = function(req, res) {
	// Returns listing of all non-hidden messages by sender
	// Note: If a callback is desired, a truthy or falsy argument must be passed beetween the sender ID and the callback.
	Message.findBySender(req.user._id)
		.then(function(messages){
			//if it worked
			res.status(200).send(messages);
		})
		.catch(function(err){
			//if it didn't
			res.status(500).send(err);
		});
};

controller.create = function(req,res){
	//creates a new message
	var newMessage = new Message();
	newMessage.sender = req.body.sender;
	newMessage.receiver = req.body.receiver;
	if(req.body.subject)newMessage.subject = req.body.subject;
	newMessage.body = req.body.body;
	if(req.body.replyTo)newMessage.replyTo = req.body.replyTo;
	if(req.body.forwardOf)newMessage.forwardOf = req.body.forwardOf;
	newMessage.location = req.body.location;
	newMessage.save()
	.then(function(message){
		//if create was successful
		res.status(200).send(message);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.show = function(req,res){
	//Find and show message if it exists
	Message.findById(req.params.id)
	.then(function(message){
		//Mark the message as read.
		message.read = Date.now();
		return message.save();
	})
	.then(function(message){
		res.status(200).send(message);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.update = function(req,res){
	//The only time a message would need to be updated is if it were being sent to the trash bin by either sender or receiver
	Message.findById(req.params.id)
	.then(function(message){
		if(req.body.trashed)message.trashed = Date.now();
		if(req.body.hidden)message.hidden = Date.now();
		return message.save();
	})
	.then(function(message){
		if(message)res.status(200).send(message);
		//error handling
		else res.status(404).send({status: 404, message:'Message not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.delete = function(req,res){
	//find and removes message
	Message.findByIdAndRemove(req.params.id)
	.then(function(message){
		//status update based on whether or not the message exists
		if(message)res.status(200).send({status: 200, message:'Message Successfully Deleted!'});
		else res.status(404).send({status: 404, message:'Message not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});

};

module.exports = controller;