import axios from 'axios'


const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

    // Initial state
const defaultUser = {}


const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})


export const getMe = () => async dispatch => {
    try {
        const {data} = await axios.get('/auth/me')
        dispatch(getUser(data || defaultUser))
    } catch (authError) {
        return dispatch(getUser({error: authError}))
    }
}

export const auth = (username, email, password, method) => async dispatch => {
    const payload = method === 'register' ? {username, email, password} : {email, password}
    try {
        const {data} = await axios.post(`/auth/${method}`, payload)
        dispatch(getUser(data))
    } catch (authError) {
        return dispatch(getUser({error: authError}))
    }
}

export const signout = () => async dispatch => {
    try {
        await axios.post('/auth/signout')
        dispatch(removeUser())
    } catch (err) {
        console.error(err)
    }
}


    //Reducer
export default function(state = defaultUser, action) {
    switch (action.type) {
        case GET_USER:
            return action.user.id ? action.user : state
        case REMOVE_USER:
            return {}
        default:
            return state
    }
}
