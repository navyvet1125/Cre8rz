var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users_controller');
// var tokens = require('../controllers/tokens_controller');


/* GET users listing and create new users*/
router.route('/')
	.get(usersController.index)
	.post(usersController.create);

// GET for NEW restful route
// router.route('/new')
// 	.get(usersController.new);

// GET, Update, delete specific users
router.route('/:id')
	.get(usersController.show)
	.put(usersController.update)
	.delete(usersController.delete);

// GET for EDIT restful route
// router.route('/:id/edit')
// 	.get(usersController.edit);


// Verify if email exists in system
router.route('/email/:email')
	.get(usersController.verifyEmail);
module.exports = router;

