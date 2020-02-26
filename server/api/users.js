const router = require('express').Router()
const User = require('../db/models')
module.exports = router

router.use('/transactions', require('./transactions'))
router.use('/holdings', require('./holdings'))