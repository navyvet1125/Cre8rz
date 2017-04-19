var express = require('express');
var router = express.Router();
var commentsController = require('../controllers/comments_controller');
// var tokens = require('../controllers/tokens_controller');


/* GET comments listing and create new comments*/
router.route('/')
	.get(commentsController.index)
	.post(commentsController.create);

// GET for NEW restful route
// router.route('/new')
// 	.get(commentsController.new);

// GET, Update, delete specific comments
router.route('/:id')
	.get(commentsController.show)
	.put(commentsController.update)
	.delete(commentsController.delete);

// GET for EDIT restful route
// router.route('/:id/edit')
// 	.get(commentsController.edit);

module.exports = router;