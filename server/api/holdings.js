const router = require('express').Router()
const Holding = require('../db/models')
module.exports = router

router.get('/holdings', async (req, res, next) => {
    console.log(req.user)
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