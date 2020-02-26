import axios from 'axios'


const SET_HOLDINGS = 'SET_HOLDINGS'


    // Initial state
const defaultHoldings = {
    totalValue: 0
}


const setHoldings = holdings => ({type: SET_HOLDINGS, holdings})


export const getHoldings = () => async dispatch => {
    try {
        const {data} = await axios.get(`/api/users/holdings`)
        let userHoldings = {totalValue: 0}
        if(data.length) {
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

export const dispatchAddHolding = (newHolding, userHoldings) => async dispatch => {
    try {
        await axios.post(`/api/users/holdings`, newHolding)
        userHoldings[newHolding.ticker] = {quantity: newHolding.quantity}
        getChangeAndTotalValue(userHoldings)
        dispatch(setHoldings(userHoldings))
    } catch (error) {
        dispatch(setHoldings({error}))
    }
}

export const dispatchUpdateHolding = (ticker, quantity, userHoldings) => async dispatch => {
    try {
        await axios.put(`/api/users/holdings/${ticker}`, {quantity})
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


    //Reducer
export default function(state = defaultHoldings, action) {
    switch (action.type) {
        case SET_HOLDINGS:
            return {...state, ...action.holdings}
        default:
            return state
    }
}