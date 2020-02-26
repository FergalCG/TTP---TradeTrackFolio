const router = require('express').Router()
const {Holding} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const holdings = await Holding.findAll({
            where: {
                userId: req.user.id
            }
        })
        res.json(holdings)
    } catch (error) {
        next(error)
    }
})