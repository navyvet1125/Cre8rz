const Message = require('../models/message')
const appTitle = 'Cre8rz'
module.exports ={

	index : (req, res) => {
		// Returns listing of all non-trashed messages by receiver
		// Note: If a callback is desired, a truthy or falsy argument must be passed beetween the receiver ID and the callback.
		Message.findByReceiver(req.user._id)
		//if it worked
		.then(messages => res.status(200).render('inbox',{title: appTitle+' - Messages', messages: messages, user: req.user}))
		//if it didn't
		.catch(err => res.status(500).send(err))
	},
	sent : (req, res) => {
		// Returns listing of all non-hidden messages by sender
		// Note: If a callback is desired, a truthy or falsy argument must be passed beetween the sender ID and the callback.
		Message.findBySender(req.user._id)
		.then(messages => res.status(200).send(messages))
		//if it didn't
		.catch(err => res.status(500).send(err))
	},

	create : (req,res) => {
		//creates a new message
		const newMessage = new Message({
			sender: req.body.sender,
			receiver: req.body.receiver,
			subject: req.body.subject||'No Subject',
			body: req.body.body,
			replyOrForward: req.body.replyOrForward || 'root',
			location: req.body.location	
		})
		newMessage.save()
		//if create was successful
		.then(message => res.status(200).send(message))
		.catch(err => res.status(500).send(err))
	},

	show : (req,res) => {
		//Find and show message if it exists
		Message.findById(req.params.id)
		.then(message => {
			//Mark the message as read.
			message.read = Date.now()
			return message.save()
		})
		.then(message => res.status(200).render('message', {message:message, title: appTitle+' - '+message.subject, user: req.user}))
		.catch(err => res.status(500).send(err))
	},

	update : (req,res) => {
		//The only time a message would need to be updated is if it were being sent to the trash bin by either sender or receiver
		Message.findById(req.params.id)
		.then(function(message){
			if(req.body.trashed)message.trashed = Date.now()
			if(req.body.hidden)message.hidden = Date.now()
			return message.save()
		})
		.then(message => message? res.status(200).send(message): res.status(404).send({status: 404, message:'Message not found!'}))
		.catch(err => res.status(500).send(err))
	},

	delete : (req,res) => {
		//find and removes message
		Message.findByIdAndRemove(req.params.id)
		//status update based on whether or not the message exists
		.then(message => message? res.status(200).send({status: 200, message:'Message Successfully Deleted!'}): res.status(404).send({status: 404, message:'Message not found!'}))
		.catch(err => res.status(500).send(err))
	}
}