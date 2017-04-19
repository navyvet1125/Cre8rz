var Comment = require('../models/comment');
var controller ={};

controller.index = function(req, res) {
	//Returns listing of all comments
	Comment.find({})
		.then(function(comments){
			//if it worked
			res.status(200).send(comments);
		})
		.catch(function(err){
			//if it didn't
			res.status(500).send(err);
		});
};

controller.create = function(req,res){
	//creates a new comment
	var newComment = new Comment();
	newComment.subject = req.body.subject;
	newComment.creator = req.body.creator;
	newComment.body = req.body.body;
	newComment.save()
	.then(function(comment){
		//if create was successful
		res.status(200).send(comment);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.show = function(req,res){
	//Find and show comment if it exists
	Comment.findById(req.params.id)
	.then(function(comment){
		res.status(200).send(comment);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.update = function(req,res){
	//Find and update a comment
	Comment.findById(req.params.id)
	.then(function(comment){
		comment.body = req.body.body;
		comment.modified = Date.now();
		return comment.save();
	})
	.then(function(comment){
		if(comment)res.status(200).send(comment);
		//error handling
		else res.status(404).send({status: 404, message:'Comment not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.delete = function(req,res){
	//find and removes comment
	Comment.findByIdAndRemove(req.params.id)
	.then(function(comment){
		//status update based on whether or not the comment exists
		if(comment)res.status(200).send({status: 200, message:'Comment Successfully Deleted!'});
		else res.status(404).send({status: 404, message:'Comment not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});

};

module.exports = controller;