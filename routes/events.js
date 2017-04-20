var express = require('express');
var router = express.Router();
var eventsController = require('../controllers/events_controller');
// var tokens = require('../controllers/tokens_controller');


/* GET entries listing and create new entries*/
router.route('/')
	.get(eventsController.index)
	.post(eventsController.create);

// GET for NEW restful route
// router.route('/new')
// 	.get(eventsController.new);

// GET, Update, delete specific entries
router.route('/:id')
	.get(eventsController.show)
	.put(eventsController.update)
	.delete(eventsController.delete);

// GET for EDIT restful route
// router.route('/:id/edit')
// 	.get(eventsController.edit);

module.exports = router;