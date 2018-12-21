const express = require('express')
const router = express.Router()
const passport   = require('passport')
const authController = require('../controllers/auth_controller')

require('../config/passport')(passport)

router.route('/local')
	.post(passport.authenticate('local', { failureRedirect: '/' }), authController.auth)


router.route('/facebook')
	.get(passport.authenticate('facebook', {scope: 'email', failureRedirect: '/auth/error'}))

router.route('/facebook/callback')
	.get(passport.authenticate('facebook', {failureRedirect: '/auth/error'}), authController.auth)

router.route('/google')
	.get(passport.authenticate('google', {scope: 'email', failureRedirect: '/auth/error'}))

router.route('/google/callback')
	.get(passport.authenticate('google', {failureRedirect: '/auth/error'}), authController.auth)

router.route('/error')
  .get(authController.error)

module.exports = router
