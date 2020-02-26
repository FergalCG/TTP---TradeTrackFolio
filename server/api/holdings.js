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

router.put('/:ticker', async (req, res, next) => {
    try {
        await Holding.update(req.body, {
            where: {
                userId: req.user.id,
                ticker: req.params.ticker
            }
        })
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        await Holding.create(req.body)
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})