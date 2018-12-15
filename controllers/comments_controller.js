const Comment = require('../models/comment')
module.exports = {
	index : (req, res) => {
		//Returns listing of all comments
		Comment.find({})
			//if it worked
			.then(comments => res.status(200).send(comments))
			//if it didn't
			.catch(err => res.status(500).send(err))
	},
	create : (req,res) =>{
		//creates a new comment

		const newComment = new Comment({subject: req.body.subject, creator: req.body.creator, body:req.body.body})
		// newComment.subject = req.body.subject
		// newComment.creator = req.body.creator
		// newComment.body = req.body.body
		newComment.save()
		//if create was successful
		.then(comment => res.status(200).send(comment))
		//error handling
		.catch(err => res.status(500).send(err))
	},
	show : (req,res) => {
		//Find and show comment if it exists
		Comment.findById(req.params.id)
		.then(comment => res.status(200).send(comment))
		//error handling
		.catch(err => res.status(500).send(err))
	},
	update:(req,res) => {
		//Find and update a comment
		Comment.findById(req.params.id)
		.then(comment => {
			comment.body = req.body.body
			comment.modified = Date.now()
			return comment.save()
		})
		.then(comment => comment ? res.status(200).send(comment) : res.status(404).send({status: 404, message:'Comment not found!'}))
		//error handling
		.catch( err => res.status(500).send(err))
	},
	delete : (req,res) => {
		//find and removes comment
		Comment.findByIdAndRemove(req.params.id)
		//status update based on whether or not the comment exists
		.then( comment => comment? res.status(200).send({status: 200, message:'Comment Successfully Deleted!'}): res.status(404).send({status: 404, message:'Comment not found!'}))
		//error handling
		.catch( err => res.status(500).send(err))
	}
}