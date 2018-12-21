const express = require('express')
const router = express.Router()
const messagesController = require('../controllers/messages_controller')
const ensure = require('connect-ensure-login').ensureLoggedIn


/* POST new messages*/
router.route('/')
	.get(ensure('/'),messagesController.index)
	.post(ensure('/'),messagesController.create)

//GET messages created by the user
router.route('/sent')
	.get(ensure('/'),messagesController.sent)


// GET, Update, delete specific messages
router.route('/message/:id')
	.get(ensure('/'),messagesController.show)
	.put(ensure('/'),messagesController.update)
	.delete(ensure('/'),messagesController.delete)

// GET for NEW restful route
// router.route('/new')
// 	.get(messagesController.new)
// GET for EDIT restful route
// router.route('/:id/edit')
// 	.get(messagesController.edit)
module.exports = router