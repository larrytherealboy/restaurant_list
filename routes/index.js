const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')
const restaurants = require('./modules/restaurants')
// const search = require('./modules/search')
const { authenticator } = require('../middleware/auth') 

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
// router.use('/search', search)
router.use('/', authenticator, home)

module.exports = router
