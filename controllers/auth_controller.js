var controller = {};

controller.auth =function(req, res){
	console.log('The User is a ' + req.user.type);
	if(req.user.type ==='admin') res.redirect('/messages');
	else res.redirect('/users');
};

controller.error = function(req, res){
	res.render('error', {message: 'Access Denied!!!'});
};

module.exports = controller;