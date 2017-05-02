var Activity	= require('../models/activity');
var Portfolio = require('../models/portfolio');
var Endorsememt = require('../models/endorsement');
var Entry = require('../models/entry');
var Event = require('../models/event');
var Message = require('../models/message');
var User = require('../models/user');

var controller ={};
//Renders the landing page.
controller.index = function(req, res, next) {
  res.render('index', { title: 'PortHole' });
};

//Renders main content page.
controller.dashboard = function(req, res, next) {
	var userPortfolios = [];
	var userEndorsements = [];
	var userEvents = [];
	var userEntries = [];
	var userMadeEvents = [];
	var userMessages =[];
	var numOfNewMessages = 0;
	var following = [];
	var userActivities =[];
	var userId = req.user.id;

	Portfolio.find({creator: userId})
	.then(function(portfolios){
		userPortfolios = portfolios;
		return Endorsememt.find({subject: userId});
	})
	.then(function(endorsements){
		if(endorsements)userEndorsements = endorsements;
		return Event.find({attendees: {$in: [userId]}});
	})
	.then(function(events){
		if(events)userEvents = events;
		return Message.findByReceiver(userId);
	})
	.then(function(messages){
		if(messages)userMessages = messages;
			return Message.findByReceiver(userId,'new');
	})
	.then(function(messages){
		if(messages)numOfNewMessages = messages.length;
		return Entry.find({creator: userId});
	})
	.then(function(entries){
		userEntries = entries;
		return User.find({followers: {$in: [userId]}});
	})
	.then(function(users){
		if(users)following = users;
		return Activity.find({receivers:{$in:[userId]}});
	})
	.then(function(activities){
		if(activities) userActivities = activities;
	})
	.catch(function(err){
        res.render('error',{message: err});
    })
    .then(function(){
		res.render('dashboard', { 
			title: 'PortHole', 
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
		});
    	
    })
};

//logs user out.  Redirects to landing page.
controller.logout = function(req,res){
  req.logout();
  res.redirect('/');
};
module.exports = controller;


function getPortfolio(portfolios, parentID){
	for (var i =0; i<portfolios.length;i++){
		if(portfolios[i]._id===parentID) return portfolios[i];
	}
};


function getKeyByValue(object, value){ 
	return Object.keys(object).find(key => object[key] === value);
};
