var express = require('express');
var router = express.Router();
var messagesController = require('../controllers/messages_controller');
// var tokens = require('../controllers/tokens_controller');


/* GET messages listing and create new messages*/
router.route('/')
	.get(messagesController.index)
	.post(messagesController.create);

// GET for NEW restful route
// router.route('/new')
// 	.get(messagesController.new);

// GET, Update, delete specific messages
router.route('/:id')
	.get(messagesController.show)
	.put(messagesController.update)
	.delete(messagesController.delete);

// GET for EDIT restful route
// router.route('/:id/edit')
// 	.get(messagesController.edit);

module.exports = router;