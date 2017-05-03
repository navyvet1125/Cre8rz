var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index_controller');
var ensure = require('connect-ensure-login').ensureLoggedIn;

/* GET home page. */
router.route('/')
	.get(indexController.index)

//Takes user to main dashboard
router.route('/dashboard')
	.get(ensure('/'),indexController.dashboard);


// Log user out
router.route('/logout')
	.get(indexController.logout);

router.route('/:login')
	.get(indexController.profile);

module.exports = router;
