const Activity	= require('../models/activity');
const Portfolio = require('../models/portfolio');
const Endorsememt = require('../models/endorsement');
const Entry = require('../models/entry');
const Event = require('../models/event');
const Message = require('../models/message');
const User = require('../models/user');
const appTitle = 'Cre8rz' //Dynamically change the name of the app.
module.exports = {
	//Renders the landing page.
	index : (req, res, next) => res.render('index', { title: appTitle }),

	profile : (req,res,next) => {
		const username = req.params.login;
		let currentUser;
		User.findOne({login: username})
		.then(user => currentUser = user)
		.then(() => Portfolio.findOne({creator: currentUser, path:''}))
		.then(portfolio => portfolio? portfolio.getArrayTree(): [])
		.then(portfolios => currentUser? res.render('profile',{title: appTitle, profile: currentUser, portfolios:portfolios, user:req.user }): res.status(404).render('error',{status: 404, message:'User not found!'}))
		.catch(err => res.status(500).send(err))
	},
	dashboard : (req, res, next) => {
		const userId = req.user.id;
		let userPortfolios = [];
		let userEndorsements = [];
		let userEvents = [];
		let userEntries = [];
		let userMadeEvents = [];
		let userMessages =[];
		let numOfNewMessages = 0;
		let following = [];
		let userActivities =[];

		Portfolio.findOne({creator: userId, path:''})
		.then(portfolio => portfolio.getArrayTree())
		.then(portfolios => {
			if(portfolios) userPortfolios = portfolios
			return Endorsememt.find({subject: userId})
		})
		.then(endorsements => {
			if(endorsements)userEndorsements = endorsements
			return Event.find({attendees: {$in: [userId]}})
		})
		.then(events => {
			if(events)userEvents = events
			return Message.findByReceiver(userId)
		})
		.then(messages => {
			if(messages)userMessages = messages
				return Message.findByReceiver(userId,'new')
		})
		.then(messages => {
			if(messages)numOfNewMessages = messages.length
			return Entry.find({creator: userId})
		})
		.then(entries => {
			userEntries = entries
			return User.find({followers: {$in: [userId]}})
		})
		.then(users => {
			if(users)following = users
			return Activity.find({receivers:{$in:[userId]}})
		})
		.then(activities => {if(activities) userActivities = activities})
		.catch(err =>  res.render('error',{message: err}))
	    .then(() => {
			res.render('dashboard', { 
				title: appTitle, 
				user:req.user, 
				portfolios: userPortfolios,
				endorsements: userEndorsements,
				events: userEvents,
				messages: {
					userMessages,
					numOfNewMessages
				},
				following: following,
				newsFeed: userActivities
			})  	
	    })
	},
	//logs user out.  Redirects to landing page.
	logout : (req,res) => {
	  req.logout()
	  res.redirect('/')
	}
}