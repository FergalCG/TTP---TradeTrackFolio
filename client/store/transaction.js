import axios from 'axios'


const SET_TRANSACTIONS = 'SET_TRANSACTIONS'
const ADD_TRANSACTION = 'ADD_TRANSACTION'

    // Initial state
const defaultTransactions = []


const setTransactions = transactions => ({type: SET_TRANSACTIONS, transactions})
const addTransaction = transaction => ({type: ADD_TRANSACTION, transaction})


export const getTransactions = (userId) => async dispatch => {
    try {
        const {data} = await axios.get(`/api/users/${userId}/transactions`)
        dispatch(setTransactions(data || defaultTransactions))
    } catch (error) {
        dispatch(setTransactions({error}))
    }
}

export const dispatchAddTransaction = (userId, transaction) => async dispatch => {
    try {
        const {data} = await axios.post(`/api/users/${userId}/transactions`, transaction)
        dispatch(addTransaction(data))
    } catch (error) {
        dispatch(addTransaction({error}))
    }
}



    //Reducer
export default function(state = defaultTransactions, action) {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return [...state, action.transactions]
        case ADD_TRANSACTION:
            return [...state, action.transaction]
        default:
            return state
    }
}