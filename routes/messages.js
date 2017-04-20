var express = require('express');
var router = express.Router();
var messagesController = require('../controllers/messages_controller');
// var tokens = require('../controllers/tokens_controller');


/* POST new messages*/
router.route('/')
	.get(messagesController.index)
	.post(messagesController.create);

//GET messages sent to a specific user
router.route('/:id')
	.get(messagesController.received);

//GET messages created by a specific user
router.route('/:id/sent')
	.get(messagesController.sent);


// GET, Update, delete specific messages
router.route('/message/:id')
	.get(messagesController.show)
	.put(messagesController.update)
	.delete(messagesController.delete);

// GET for NEW restful route
// router.route('/new')
// 	.get(messagesController.new);
// GET for EDIT restful route
// router.route('/:id/edit')
// 	.get(messagesController.edit);
module.exports = router;