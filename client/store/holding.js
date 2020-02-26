import axios from 'axios'


const SET_HOLDINGS = 'SET_HOLDINGS'


    // Initial state
const defaultHoldings = {
    totalValue: 0
}


const setHoldings = holdings => ({type: SET_HOLDINGS, holdings})


export const getHoldings = userId => async dispatch => {
    try {
        const {data} = await axios.get(`/api/users/${userId}/holdings`)
        let userHoldings = {totalValue = 0}
        if(data) {
            data.forEach(holding => {
                userHoldings[holding.ticker] = {quantity: holding.quantity}
            })
            getChangeAndTotalValue(userHoldings)
        }
        dispatch(setHoldings(userHoldings))
    } catch (error) {
        dispatch(setHoldings({error}))
    }
}

export const dispatchAddHolding = (userId, newHolding, userHoldings) => async dispatch => {
    try {
        await axios.post(`/api/users/${userId}/holdings`, newHolding)
        userHoldings[newHolding.ticker] = {quantity: newHolding.quantity}
        getChangeAndTotalValue(userHoldings)
        dispatch(setHoldings(userHoldings))
    } catch (error) {
        dispatch(setHoldings({error}))
    }
}

export const dispatchUpdateHolding = (userId, ticker, quantity, userHoldings) => async dispatch => {
    try {
        await axios.put(`/api/users/${userId}/holdings/${ticker}`, {quantity})
        userHoldings[ticker].quantity = quantity
        getChangeAndTotalValue(userHoldings)
        dispatch(setHoldings(userHoldings))
    } catch (error) {
        dispatch(setHoldings({error}))
    }
}

const getChangeAndTotalValue = async userHoldings => {
    try {
        const tickerArray = userHoldings.keys(),
            queryString = tickerArray.join(',')
        let totalValue = 0
        const {data} = await axios.get(`/api/stocks/${queryString}`)
        tickerArray.forEach(ticker => {
            const tickerValue = data[ticker].quote.latestPrice * 100 * userHoldings[ticker].quantity
            userHoldings[ticker].change = data[ticker].quote.change
            userHoldings[ticker].value = tickerValue
            totalValue += tickerValue
        })
        userHoldings.totalValue = totalValue
    } catch (error) {
        console.error('Error clculating total value of stocks!', error)
    }
}


// http://sandbox.iexapis.com/stable/stock/market/batch?symbols=${queryString}&types=quote&filter=latestPrice,change&token=${process.env.IEX_DEV_PUBLIC_KEY}


    //Reducer
export default function(state = defaultHoldings, action) {
    switch (action.type) {
        case SET_HOLDINGS:
            return {...state, ...action.holdings}
        default:
            return state
    }
}