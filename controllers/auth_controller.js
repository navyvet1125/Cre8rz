var controller = {}

controller.auth = (req, res) => 	req.user.type ==='admin'? res.redirect('/dashboard') : res.redirect('/dashboard')

controller.error = (req, res) => res.render('error', {message: 'Access Denied!!!'})
module.exports = controller