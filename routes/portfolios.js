const express = require('express')
const router = express.Router()
const portfoliosController = require('../controllers/portfolios_controller')
// const tokens = require('../controllers/tokens_controller')


/* GET entries listing and create new entries*/
router.route('/')
	.get(portfoliosController.index)
	.post(portfoliosController.create)

// GET for NEW restful route
// router.route('/new')
// 	.get(portfoliosController.new)

// GET, Update, delete specific entries
router.route('/:id')
	.get(portfoliosController.show)
	.put(portfoliosController.update)
	.delete(portfoliosController.delete)

// GET for EDIT restful route
// router.route('/:id/edit')
// 	.get(portfoliosController.edit)

module.exports = router