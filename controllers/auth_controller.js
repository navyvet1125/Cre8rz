var controller = {};

controller.auth =function(req, res){
	if(req.user.type ==='admin') res.redirect('/dashboard');
	else res.redirect('/dashboard');
};

controller.error = function(req, res){
	res.render('error', {message: 'Access Denied!!!'});
};

module.exports = controller;