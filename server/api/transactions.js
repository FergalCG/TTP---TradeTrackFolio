const router = require('express').Router()
const {Transaction} = require('../db/models')
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
        const transaction = {...req.body, userId: req.user.id},
            newTransaction = await Transaction.create(transaction)
        res.status(201).json(newTransaction.dataValues)
    } catch (error) {
        next(error)
    }
})