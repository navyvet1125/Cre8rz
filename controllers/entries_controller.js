var Entry = require('../models/entry');
var controller ={};

controller.index = function(req, res) {
	//Returns listing of all entries
	Entry.find({})
		.then(function(entries){
			//if it worked
			res.status(200).send(entries);
		})
		.catch(function(err){
			//if it didn't
			res.status(500).send(err);
		});
};

controller.create = function(req,res){
	//creates a new entry
	var newEntry = new Entry();
	newEntry.creator = req.body.creator;
	newEntry.title = req.body.title;
	newEntry.url = req.body.url;
	newEntry.description = req.body.description;
	newEntry.content = req.body.content;
	newEntry.category = req.body.category;
	newEntry.save()
	.then(function(entry){
		//if create was successful
		res.status(200).send(entry);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.show = function(req,res){
	//Find and show entry if it exists
	Entry.findById(req.params.id)
	.then(function(entry){
		res.status(200).send(entry);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.update = function(req,res){
	//Find and update a entry
	Entry.findById(req.params.id)
	.then(function(entry){
		if(req.body.title)entry.title = req.body.title;
		if(req.body.url)entry.url = req.body.url;
		if(req.body.description)entry.description = req.body.description;
		if(req.body.content)entry.content = req.body.content;
		if(req.body.category)entry.category = req.body.category;
		entry.modified = Date.now();

		return entry.save();
	})
	.then(function(entry){
		if(entry)res.status(200).send(entry);
		//error handling
		else res.status(404).send({status: 404, message:'Entry not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.delete = function(req,res){
	//find and removes entry
	Entry.findByIdAndRemove(req.params.id)
	.then(function(entry){
		//status update based on whether or not the entry exists
		if(entry)res.status(200).send({status: 200, message:'Entry Successfully Deleted!'});
		else res.status(404).send({status: 404, message:'Entry not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});

};

module.exports = controller;