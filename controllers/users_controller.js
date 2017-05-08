var User = require('../models/user');
var Portfolio = require('../models/portfolio');
var controller ={};

controller.index = function(req, res) {
	//Returns listing of all users
	User.find({})
		.then(function(users){
			//if it worked
			res.status(200).send(users);
		})
		.catch(function(err){
			//if it didn't
			res.status(500).send(err);
		});
};

controller.create = function(req,res){
	//creates a new user
	var newUser = new User();
	var inputUser = req.body;
	newUser.name = inputUser['user[name]'];
	newUser.email = inputUser['user[email]'];
	newUser.login = inputUser['user[login]'];
	if(inputUser['user[password]'] === inputUser['user[password]'])	newUser.password = inputUser['user[password]'];
	else throw new Error('Passwords do not match!!!');
	newUser.save()
	.then(function(user){
		//if create was successful
		return Portfolio.findOne({creator:user})
	})
	.then(function(portfolio){
		res.status(200).render('dashboard', { title: 'PortHole', user:newUser, portfolios:[]});
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