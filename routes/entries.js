const express = require('express')
const router = express.Router()
const entriesController = require('../controllers/entries_controller')
// const tokens = require('../controllers/tokens_controller')


/* GET entries listing and create new entries*/
router.route('/')
	.get(entriesController.index)
	.post(entriesController.create)

// GET for NEW restful route
// router.route('/new')
// 	.get(entriesController.new)

// GET, Update, delete specific entries
router.route('/:id')
	.get(entriesController.show)
	.put(entriesController.update)
	.delete(entriesController.delete)

// GET for EDIT restful route
// router.route('/:id/edit')
// 	.get(entriesController.edit)

module.exports = router