var Endorsement = require('../models/endorsements');
var controller ={};

controller.index = function(req, res) {
	//Returns listing of all endorsements
	Endorsement.find({})
		.then(function(endorsements){
			//if it worked
			res.status(200).send(endorsements);
		})
		.catch(function(err){
			//if it didn't
			res.status(500).send(err);
		});
};

controller.create = function(req,res){
	//creates a new endorsement
	var newEndorsement = new Endorsement();
	newEndorsement.subject = req.body.subject;
	newEndorsement.creator = req.body.creator;
	newEndorsement.title = req.body.title;
	newEndorsement.body = req.body.body;
	if(req.body.rating)newEndorsement.rating = req.body.rating;
	newEndorsement.save()
	.then(function(endorsement){
		//if create was successful
		res.status(200).send(endorsement);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.show = function(req,res){
	//Find and show endorsement if it exists
	Endorsement.findById(req.params.id)
	.then(function(endorsement){
		res.status(200).send(endorsement);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.update = function(req,res){
	//Find and update a endorsement
	Endorsement.findById(req.params.id)
	.then(function(endorsement){
		var changed = false;
		//if title, body, or rating of the endorsement has changed then update it and indicate the time it was changed.
		if(req.body.title && (endorsement.title!== req.body.title)){
			endorsement.title = req.body.title;
			changed = true;
		}

		if(req.body.body && (endorsement.body!== req.body.body)){
			endorsement.body = req.body.body;
			changed = true;
		}
		if(req.body.rating && (endorsement.rating!== req.body.rating)){
			endorsement.rating = req.body.rating;
			changed = true;
		}
		if(changed) endorsement.modified = Date.now();

		return endorsement.save();
	})
	.then(function(endorsement){
		if(endorsement)res.status(200).send(endorsement);
		//error handling
		else res.status(404).send({status: 404, message:'Endorsement not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.delete = function(req,res){
	//find and removes endorsement
	Endorsement.findByIdAndRemove(req.params.id)
	.then(function(endorsement){
		//status update based on whether or not the endorsement exists
		if(endorsement)res.status(200).send({status: 200, message:'Endorsement Successfully Deleted!'});
		else res.status(404).send({status: 404, message:'Endorsement not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});

};

module.exports = controller;