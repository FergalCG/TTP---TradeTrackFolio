import axios from 'axios'


const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_BALANCE = 'UPDATE_BALANCE'

    // Initial state
const defaultUser = {}


const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateBalance = cost => ({type: UPDATE_BALANCE, cost})


export const getMe = () => async dispatch => {
    try {
        const {data} = await axios.get('/auth/me')
        dispatch(getUser(data || defaultUser))
    } catch (error) {
        console.error(error)
    }
}

export const auth = (username, email, password, method) => async dispatch => {
    const payload = method === 'register' ? {username, email, password} : {email, password}
    try {
        const {data} = await axios.post(`/auth/${method}`, payload)
        dispatch(getUser(data))
    } catch (error) {
        console.error(error)
    }
}

export const signout = () => async dispatch => {
    try {
        await axios.post('/auth/signout')
        dispatch(removeUser())
    } catch (error) {
        console.error(error)
    }
}

export const dispatchUpdateBalance = cost => async dispatch => {
    try {
        dispatch(updateBalance(cost))
    } catch (error) {
        console.error(error)
    }
}


    //Reducer
export default function(state = defaultUser, action) {
    switch (action.type) {
        case GET_USER:
            return action.user.id ? action.user : state
        case REMOVE_USER:
            return {}
        case UPDATE_BALANCE:
            return {...state, balance: state.balance - action.cost}
        default:
            return state
    }
}
