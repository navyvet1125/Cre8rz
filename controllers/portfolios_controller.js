const Portfolio = require('../models/portfolio')
module.exports ={
	index : (req, res) => {
		//Returns listing of all portfolios
		Portfolio.find({})
			.then(portfolios => res.status(200).send(portfolios))
			.catch(err => res.status(500).send(err))
	},

	create : (req,res) =>{
		//creates a new portfolio
		const newPortfolio = new Portfolio({
			creator : req.body.creator
			name : req.body.name
			description : req.body.description
			type : req.body.type
			purpose : req.body.purpose
		})
		newPortfolio.save()
		.then(portfolio =>res.status(200).send(portfolio))
		.catch(err => res.status(500).send(err))
	},
	show : (req,res) => {
		//Find and show portfolio if it exists
		Portfolio.findById(req.params.id)
		.then(portfolio => res.status(200).send(portfolio))
		.catch(err => res.status(500).send(err))
	},

	update : (req,res)=> {
		//Find and update a portfolio
		Portfolio.findById(req.params.id)
		.then(portfolio => {
			if(req.body.name)portfolio.name = req.body.name;
			if(req.body.description)portfolio.description = req.body.description;
			if(req.body.type)portfolio.type = req.body.type;
			if(req.body.purpose)portfolio.purpose = req.body.purpose;
			portfolio.modified = Date.now();

			return portfolio.save();
		})
		.then(portfolio => portfolio? res.status(200).send(portfolio): res.status(404).send({status: 404, message:'Portfolio not found!'}))
		.catch(err => res.status(500).send(err))
		},

	delete : (req,res) => {
		//find and removes portfolio
		Portfolio.findByIdAndRemove(req.params.id)
		.then(portfolio =>	portfolio? res.status(200).send({status: 200, message:'Portfolio Successfully Deleted!'}):res.status(404).send({status: 404, message:'Portfolio not found!'}))
		.catch(err => res.status(500).send(err))
	}
}