import axios from 'axios'
import {dispatchUpdateBalance} from './user'


const SET_TRANSACTIONS = 'SET_TRANSACTIONS'
const ADD_TRANSACTION = 'ADD_TRANSACTION'

    // Initial state
const defaultTransactions = []


const setTransactions = transactions => ({type: SET_TRANSACTIONS, transactions})
const addTransaction = transaction => ({type: ADD_TRANSACTION, transaction})


export const getTransactions = () => async dispatch => {
    try {
        const {data} = await axios.get(`/api/users/transactions`)
        dispatch(setTransactions(data || defaultTransactions))
    } catch (error) {
        console.error(error)
    }
}

export const dispatchAddTransaction = transaction => async dispatch => {
    try {
        const {data} = await axios.get(`/api/stocks/${transaction.ticker}`)
        if(data === 404) return 404
        const ticker = transaction.ticker,
            price = data[ticker].quote.latestPrice,
            tickerValue = price * 100 * transaction.quantity
        const status = await axios.put('/api/users', {cost: tickerValue})
        if(status.data.status === 400) {
            return 400
        }else {
            transaction = {...transaction, pricePaid: price}
            const completeTransaction = await axios.post(`/api/users/transactions`, transaction)
            dispatch(addTransaction(completeTransaction.data))
            dispatch(dispatchUpdateBalance(tickerValue))
        }
    } catch (error) {
        console.error(error)
    }
}



    //Reducer
export default function(state = defaultTransactions, action) {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return [...action.transactions]
        case ADD_TRANSACTION:
            return [...state, action.transaction]
        default:
            return state
    }
}