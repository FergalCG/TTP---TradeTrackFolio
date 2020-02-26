const router = require('express').Router()
const Transactions = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll({
            where: {
                userId: req.user.id
            }
        })
        res.json(transactions)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        await Transaction.create(req.body)
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})