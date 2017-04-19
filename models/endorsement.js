var mongoose = require('mongoose');
var User 	 = require('./user');

var endorsementSchema = new mongoose.Schema({
	// A system for creating endorsements for artists.
	subject: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}, //Person receiving the endorsement
	creator: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}, //Person giving the endorsement
	title: {type: String, default: 'No Subject'},								 //Title of the endorsement
	body: {type: String},														 //Body of the endorsement
	rating:{type: String, enum:[
		'excellent',
		'very good', 
		'good',
		'fair',
		'poor',
		'none'
	], default:'none'},															 //rating of the endorsement
	approved: {type:Boolean, default: true}										 //If the endorsement is approved
});


var Endorsement = mongoose.model('Endorsement', endorsementSchema);

module.exports = Endorsement;