const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/:queryString', async (req, res, next) => {
    try {
        const {data} = await axios.get(`http://sandbox.iexapis.com/stable/stock/market/batch?symbols=${queryString}&token=${process.env.IEX_DEV_PUBLIC_KEY}`)
        res.json(data)
    } catch (error) {
        next(error)
    }
})

// http://sandbox.iexapis.com/stable/stock/market/batch?symbols=${queryString}&types=quote&filter=latestPrice,change&token=${process.env.IEX_DEV_PUBLIC_KEY}