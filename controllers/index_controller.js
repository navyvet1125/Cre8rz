var controller ={};
//Renders the landing page.
controller.index = function(req, res, next) {
  res.render('index', { title: 'PortHole' });
};

//Renders main content page.
controller.dashboard = function(req, res, next) {
  res.render('dashboard', { title: 'PortHole', user:req.user });
};

//logs user out.  Redirects to landing page.
controller.logout = function(req,res){
  req.logout();
  res.redirect('/');
};
module.exports = controller;
