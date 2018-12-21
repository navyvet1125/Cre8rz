const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users_controller')
const ensure = require('connect-ensure-login').ensureLoggedIn
// const tokens = require('../controllers/tokens_controller')


/* GET users listing and create new users*/
router.route('/')
	.get(ensure('/'), usersController.index)
	.post(usersController.create)

// GET for NEW restful route
router.route('/new')
	.get(usersController.new)

// GET, Update, delete specific users
router.route('/:id')
	.get(usersController.show)
	.put(ensure('/'), usersController.update)
	.delete(ensure('/'), usersController.delete)

// GET for EDIT restful route
// router.route('/:id/edit')
// 	.get(usersController.edit)


// Verify if email exists in system
router.route('/email/:email')
	.get(ensure('/'), usersController.verifyEmail)
module.exports = router

