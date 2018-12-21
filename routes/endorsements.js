const express = require('express')
const router = express.Router()
const endorsementsController = require('../controllers/endorsements_controller')
// const tokens = require('../controllers/tokens_controller')


/* GET endorsements listing and create new endorsements*/
router.route('/')
	.get(endorsementsController.index)
	.post(endorsementsController.create)

// GET for NEW restful route
// router.route('/new')
// 	.get(endorsementsController.new)

// GET, Update, delete specific endorsements
router.route('/:id')
	.get(endorsementsController.show)
	.put(endorsementsController.update)
	.delete(endorsementsController.delete)

// GET for EDIT restful route
// router.route('/:id/edit')
// 	.get(endorsementsController.edit)

module.exports = router