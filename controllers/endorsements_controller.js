const Endorsement = require('../models/endorsement')
module.exports ={
	index : (req, res) => {
		//Returns listing of all endorsements
		Endorsement.find({})
			//Send them if it worked
			.then(endorsements => res.status(200).send(endorsements))
			.catch(err => res.status(500).send(err))
	},
	create : (req,res) => {
		//creates a new endorsement
		const newEndorsement = new Endorsement({
			subject : req.body.subject,
			creator : req.body.creator,
			title : req.body.title,
			body : req.body.body,
			rating : req.body.rating || 'none'
		})
		newEndorsement.save()
		//Send it if it worked
		.then(endorsement => res.status(200).send(endorsement))
		.catch(err => res.status(500).send(err))
	},
	show : (req,res) => {
		//Find and show endorsement if it exists
		Endorsement.findById(req.params.id)
		.then(endorsement => res.status(200).send(endorsement))
		.catch(err => res.status(500).send(err))
	},
	update : (req,res) => {
		//Find and update a endorsement
		Endorsement.findById(req.params.id)
		.then(endorsement => {
			//if title, body, or rating of the endorsement has changed then update it and indicate the time it was changed.
			if(req.body.title)endorsement.title = req.body.title
			if(req.body.body)endorsement.body = req.body.body
			if(req.body.rating)endorsement.rating = req.body.rating
			endorsement.modified = Date.now()

			return endorsement.save();
		})
		.then(endorsement => endorsement? res.status(200).send(endorsement): res.status(404).send({status: 404, message:'Endorsement not found!'}))
		.catch(err => res.status(500).send(err))
	},
	delete : (req,res) => {
		//find and removes endorsement
		Endorsement.findByIdAndRemove(req.params.id)
		.then(endorsement => endorsement? res.status(200).send({status: 200, message:'Endorsement Successfully Deleted!'}): res.status(404).send({status: 404, message:'Endorsement not found!'}))
		.catch(err => res.status(500).send(err))
	}
}