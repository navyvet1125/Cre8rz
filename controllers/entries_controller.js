const Entry = require('../models/entry')
module.exports = {
	index : (req, res) => {
		//Returns listing of all entries
		Entry.find({})
			.then(entries => res.status(200).send(entries))
			.catch(err => res.status(500).send(err))
	},
	create : (req,res) =>{
		//creates a new entry
		const newEntry = new Entry({
			creator : req.body.creator,
			title : req.body.title,
			url : req.body.url,
			description : req.body.description,
			content : req.body.content,
			category : req.body.category
		})
		newEntry.save()
		.then(entry => res.status(200).send(entry))
		.catch(err => res.status(500).send(err))
	},
	show : (req,res) => {
		//Find and show entry if it exists
		Entry.findById(req.params.id)
		.then(entry => res.status(200).send(entry))
		.catch(err => res.status(500).send(err))
	},
	update : (req,res) => {
		//Find and update a entry
		Entry.findById(req.params.id)
		.then(entry => {
			if(req.body.title)entry.title = req.body.title
			if(req.body.url)entry.url = req.body.url
			if(req.body.description)entry.description = req.body.description
			if(req.body.content)entry.content = req.body.content
			if(req.body.category)entry.category = req.body.category
			entry.modified = Date.now()
			return entry.save()
		})
		.then(entry => entry? res.status(200).send(entry): res.status(404).send({status: 404, message:'Entry not found!'}))
		.catch(err => res.status(500).send(err)) //error handling
	},
	delete : (req,res) => {
		//find and removes entry
		Entry.findByIdAndRemove(req.params.id)
		.then(entry => entry? res.status(200).send({status: 200, message:'Entry Successfully Deleted!'}): res.status(404).send({status: 404, message:'Entry not found!'}))
		.catch(err => res.status(500).send(err)) //error handling
	}
}