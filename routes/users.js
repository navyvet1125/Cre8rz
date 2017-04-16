var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users_controller');
// var tokens = require('../controllers/tokens_controller');


/* GET users listing and create new users*/
router.route('/')
	.get(usersController.index)
	.post(usersController.create);

// GET, Update, delete specific users
router.route('/:id')
	.get(usersController.show)
	.put(usersController.update)
	.delete(usersController.delete);

// Verify if email exists in system
router.route('/email/:email')
	.get(usersController.verifyEmail);
module.exports = router;

