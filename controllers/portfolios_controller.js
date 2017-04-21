var Portfolio = require('../models/portfolio');
var controller ={};

controller.index = function(req, res) {
	//Returns listing of all portfolios
	Portfolio.find({})
		.then(function(portfolios){
			//if it worked
			res.status(200).send(portfolios);
		})
		.catch(function(err){
			//if it didn't
			res.status(500).send(err);
		});
};

controller.create = function(req,res){
	//creates a new portfolio
	var newPortfolio = new Portfolio();
	newPortfolio.creator = req.body.creator;
	newPortfolio.name = req.body.name;
	newPortfolio.description = req.body.description;
	newPortfolio.type = req.body.type;
	newPortfolio.purpose = req.body.purpose;
	newPortfolio.save()
	.then(function(portfolio){
		//if create was successful
		res.status(200).send(portfolio);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.show = function(req,res){
	//Find and show portfolio if it exists
	Portfolio.findById(req.params.id)
	.then(function(portfolio){
		res.status(200).send(portfolio);
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.update = function(req,res){
	//Find and update a portfolio
	Portfolio.findById(req.params.id)
	.then(function(portfolio){
		if(req.body.name)portfolio.name = req.body.name;
		if(req.body.description)portfolio.description = req.body.description;
		if(req.body.type)portfolio.type = req.body.type;
		if(req.body.purpose)portfolio.purpose = req.body.purpose;
		portfolio.modified = Date.now();

		return portfolio.save();
	})
	.then(function(portfolio){
		if(portfolio)res.status(200).send(portfolio);
		//error handling
		else res.status(404).send({status: 404, message:'Portfolio not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.delete = function(req,res){
	//find and removes portfolio
	Portfolio.findByIdAndRemove(req.params.id)
	.then(function(portfolio){
		//status update based on whether or not the portfolio exists
		if(portfolio)res.status(200).send({status: 200, message:'Portfolio Successfully Deleted!'});
		else res.status(404).send({status: 404, message:'Portfolio not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});

};

module.exports = controller;