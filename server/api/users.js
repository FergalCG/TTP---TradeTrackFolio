const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
    console.log(req.user.balance, '------', req.body.cost)
    try {
        if(req.user.balance - req.body.cost < 0) {
            res.json({status: 400})
        }else {
            await User.update({balance: req.user.balance - req.body.cost}, {
                where: {
                    id: req.user.id
                }
            })
            res.sendStatus(200)
        }
    } catch (error) {
        next(error)
    }
})

router.use('/transactions', require('./transactions'))
router.use('/holdings', require('./holdings'))