const router = require('express').Router()
module.exports = router

router.use('/stocks', require('./stocks'))
router.use('/users', require('./users'))