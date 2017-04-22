var controller = {};

controller.auth =function(req, res){
	if(req.user.type ==='admin') res.redirect('/users');
	else res.redirect('/users');
};

controller.error = function(req, res){
	res.render('error', {message: 'Access Denied!!!'});
};

module.exports = controller;