const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/:queryString', async (req, res, next) => {
    try {
        const {data} = await axios.get(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${req.params.queryString}&types=quote&filter=latestPrice,change&token=${process.env.IEX_DEV_PUBLIC_KEY}`)
        res.json(data)
    } catch (error) {
        console.log(error.response.status, '<---------- ERROR STATUS HERE BOYS!')
        res.json(error.response.status)
    }
})

// // 