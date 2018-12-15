const User = require('../models/user')
const Portfolio = require('../models/portfolio')

module.exports ={
	index : (req, res) => {
		//Returns listing of all users
		User.find({})
			//if it worked
			.then(users => res.status(200).send(users))
			//if it didn't
			.catch(err => res.status(500).send(err))
	},
	create : (req,res) => {
		const passport = require('passport')
		require('../config/passport')(passport)
		const inputUser = req.body;
		//creates a new user
		if(inputUser['user[password]'] !== inputUser['user[password]']) throw new Error('Passwords do not match!!!')
		const newUser = new User({
			name : inputUser['user[name]'],
			email : inputUser['user[email]'],
			login : inputUser['user[login]'],
			city : inputUser['user[city]'],
			password : inputUser['user[password]']
		})
		newUser.save()
		
		//if create was successful redirect and render
		.then(user => {
			res.redirect('/dashboard');
			res.status(200).render('dashboard', { 
				title: 'Cre8rz', 
				user:newUser, 
				portfolios: [],
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
		//error handling
		.catch(err => res.status(500).send(err))
	},
	new : (req,res) => res.render('newUser', {title:'Cre8rz - Sign Up'}),
	show : (req,res) => {
		//Find and show user if they exist
		User.findById(req.params.id)
		.then(user => user? res.status(200).send(user): res.status(404).render('error',{status: 404, message: 'User not found!'}))
		//error handling
		.catch(err => res.status(500).send(err))
	},
	update : (req,res) =>{
		//Find and update a user
		User.findById(req.params.id)
		.then(user => {
			//Update only what is applicable
			if(req.body.name) user.name = req.body.name
			if(req.body.email) user.email = req.body.email
			if(req.body.type) user.type = req.body.type
			if(req.body.password) user.password = req.body.password
			if(req.body.career) user.career = req.body.career
			if(req.body.city) user.city = req.body.city
			if(req.body.bio) user.bio = req.body.bio
			return user.save()
		})
		.then(user => user? res.status(200).send(user): res.status(404).send({status: 404, message:'User not found!'}))
		//error handling
		.catch(err => res.status(500).send(err))
	},
	delete : (req,res) => {
		//find and removes user
		User.findByIdAndRemove(req.params.id)
		//status update based on whether or not the user exists
		.then(user => user? res.status(200).send({status: 200, message:'User Successfully Deleted!'}):  res.status(404).send({status: 404, message:'User not found!'}))
		//error handling
		.catch(err => res.status(500).send(err))
	},

	verifyEmail : (req,res) => {
		//queries database for a user with the requested email
		User.findByEmail(req.params.email)
			//if the user exists return true else return false
			.then(user => user? res.status(200).send({status: 200, email: req.params.email, exists:true}): res.status(200).send({status: 200, email: req.params.email, exists:false}))
			//error handling
			.catch(err => res.status(500).send(err))
	},
	logout : (req,res) => {
	  req.logout()
	  res.redirect('/')
	}

}







