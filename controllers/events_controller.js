const Event = require('../models/event');
module.exports = {
	index : (req, res) => {
		//Returns listing of all events
		Event.find({})
		.then(events => res.status(200).send(events))
		.catch(err => res.status(500).send(err))
	},

	create : (req,res) => {
		//creates a new event
		const newEvent = new Event({
			creator : req.body.creator,
			title : req.body.title,
			description : req.body.description,
			when : req.body.when,
			location : req.body.location
		})
		newEvent.save()
		.then(event => res.status(200).send(evnts))
		.catch(err => res.status(500).send(err))
	},
	show : (req,res) => {
		//Find and show event if it exists
		Event.findById(req.params.id)
		.then(event => res.status(200).send(evnts))
		.catch(err => res.status(500).send(err))
	},
	update : (req,res) => {
		//Find and update a event
		Event.findById(req.params.id)
		.then(event => {
			if(req.body.title)event.title = req.body.title
			if(req.body.description)event.description = req.body.description
			if(req.body.when)event.when = req.body.when
			if(req.body.location)event.location = req.body.location
			event.modified = Date.now()
			return event.save();
		})
		.then(event => event? res.status(200).send(event) : res.status(404).send({status: 404, message:'Event not found!'}))
		.catch(err => res.status(500).send(err))
	},
	delete : (req,res) => {
		//find and removes event
		Event.findByIdAndRemove(req.params.id)
		.then(event => event? res.status(200).send({status: 200, message:'Event Successfully Deleted!'}) : res.status(404).send({status: 404, message:'Event not found!'}))
		.catch(err => res.status(500).send(err))
	}
}