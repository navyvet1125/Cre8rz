var Event = require('../models/event');
var controller ={};

controller.index = function(req, res) {
	//Returns listing of all events
	Event.find({})
		.then(function(events){
			//if it worked
			res.status(200).send(events);
		})
		.catch(function(err){
			//if it didn't
			res.status(500).send(err);
		});
};

controller.create = function(req,res){
	//creates a new event
	var newEvent = new Event();
	newEvent.creator = req.body.creator;
	newEvent.title = req.body.title;
	newEvent.description = req.body.description;
	newEvent.when = req.body.when;
	newEvent.location = req.body.location;
	newEvent.save()
	.then(function(event){
		//if create was successful
		res.status(200).send(event);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.show = function(req,res){
	//Find and show event if it exists
	Event.findById(req.params.id)
	.then(function(event){
		res.status(200).send(event);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.update = function(req,res){
	//Find and update a event
	Event.findById(req.params.id)
	.then(function(event){
		if(req.body.title)event.title = req.body.title;
		if(req.body.description)event.description = req.body.description;
		if(req.body.when)event.when = req.body.when;
		if(req.body.location)event.location = req.body.location;
		event.modified = Date.now();

		return event.save();
	})
	.then(function(event){
		if(event)res.status(200).send(event);
		//error handling
		else res.status(404).send({status: 404, message:'Event not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.delete = function(req,res){
	//find and removes event
	Event.findByIdAndRemove(req.params.id)
	.then(function(event){
		//status update based on whether or not the event exists
		if(event)res.status(200).send({status: 200, message:'Event Successfully Deleted!'});
		else res.status(404).send({status: 404, message:'Event not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});

};

module.exports = controller;