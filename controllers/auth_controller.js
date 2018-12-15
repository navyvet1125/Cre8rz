module.exports = {
	auth  : (req, res) => 	req.user.type ==='admin'? res.redirect('/dashboard') : res.redirect('/dashboard'),
	error : (req, res) => res.render('error', {message: 'Access Denied!!!'})
}