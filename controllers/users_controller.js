const User = require('../models/user')
const Portfolio = require('../models/portfolio')

var controller ={}

controller.index = (req, res) => {
	//Returns listing of all users
	User.find({})
		//if it worked
		.then(users => res.status(200).send(users))
		//if it didn't
		.catch(err => res.status(500).send(err))
}

controller.create = function(req,res){
	const passport   = require('passport');
	require('../config/passport')(passport);
	//creates a new user
	var newUser = new User();
	let inputUser = req.body;
	inputUser['user[password]'] === inputUser['user[password]']? newUser= inputUser: new Error('Passwords do not match!!!')
	
	// newUser.name = inputUser['user[name]'];
	// newUser.email = inputUser['user[email]'];
	// newUser.login = inputUser['user[login]'];
	// newUser.city = inputUser['user[city]'];
	// inputUser['user[password]'] === inputUser['user[password]']? newUser.password = inputUser['user[password]']: new Error('Passwords do not match!!!')
	newUser.save()
	.then(function(user){
		//if create was successful
		return Portfolio.findOne({creator:user});
	})
	.then(function(portfolio){
		res.redirect('/dashboard');
		res.status(200).render('dashboard', { 
			title: 'PortHole', 
			user:newUser, 
			portfolios: portfolio,
			endorsements: [],
			events: [],
			messages: {
				userMessages:[],
				numOfNewMessages:0
			},
			following: [],
			newsFeed: []
		});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.new = function(req,res){
	res.render('newUser', {title:'PortHole - Sign Up'});
};


controller.show = function(req,res){
	//Find and show user if they exist
	User.findById(req.params.id)
	.then(function(user){
		if(user)res.status(200).send(user);
		else res.status(404).render('error',{status: 404, message:'User not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.update = function(req,res){
	//Find and update a user
	User.findById(req.params.id)
	.then(function(user){
		//Update only what is applicable
		if(req.body.name) user.name = req.body.name;
		if(req.body.email) user.email = req.body.email;
		if(req.body.type) user.type = req.body.type;
		if(req.body.password) user.password = req.body.password;
		if(req.body.career) user.career = req.body.career;
		if(req.body.city) user.city = req.body.city;
		if(req.body.bio) user.bio = req.body.bio;
		return user.save();
	})
	.then(function(user){
		if(user)res.status(200).send(user);
		//error handling
		else res.status(404).send({status: 404, message:'User not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});
};

controller.delete = function(req,res){
	//find and removes user
	User.findByIdAndRemove(req.params.id)
	.then(function(user){
		//status update based on whether or not the user exists
		if(user)res.status(200).send({status: 200, message:'User Successfully Deleted!'});
		else res.status(404).send({status: 404, message:'User not found!'});
	})
	.catch(function(err){
		//error handling
		res.status(500).send(err);
	});

};

controller.verifyEmail = function(req,res){
	//queries database for a user with the requested email
	User.findByEmail(req.params.email)
		.then(function(user){
			//if the user exists return true else return false
			if(user)res.status(200).send({status: 200, email: req.params.email, exists:true});
			else res.status(200).send({status: 200, email: req.params.email, exists:false});
		})
		.catch(function(err){
			//error handling
			res.status(500).send(err);
		});

};

controller.logout = function(req,res){
  req.logout();
  res.redirect('/');
};
module.exports = controller;