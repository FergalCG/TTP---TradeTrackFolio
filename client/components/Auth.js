import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import history from '../history'
import {auth} from '../store/user'

class AuthForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.auth(
            this.state.username,
            this.state.email, 
            this.state.password,  
            event.target.name
        )
        history.push('/portfolio')
    }

    render() {
        const {name, displayName, error} = this.props
        return (
            <div id="auth-form-container">
                <h2>{displayName}</h2>
                <form id="auth-form" onSubmit={this.handleSubmit} name={name}>
                    {
                        name === 'register' && (
                            <div>
                                <input name="username" type="text" placeholder="Name" onChange={this.handleChange} minLength={1}/>
                            </div>
                        )
                    }
                    <div>
                        <input name="email" type="text" placeholder="Email" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input id="password-input" name="password" type="password" placeholder="Password" onChange={this.handleChange} minLength={8}/>
                    </div>
                    <div>
                        <button type="submit">{displayName}</button>
                    </div>
                    {
                        name === 'signin' ?
                            <p>Don't have an account yet? <NavLink activeClassName='active' to="/register">Register</NavLink></p>
                        :
                            <p>Already have an account? <NavLink activeClassName='active' to="/signin">Sign In</NavLink></p>
                    }
                    
                    {error && error.response && <div> {error.response.data} </div>}
                </form>
            </div>

        )
    }
}


const mapSigninToProps = state => ({
    name: 'signin',
    displayName: 'Sign In',
    error: state.user.error
})

const mapRegisterToProps = state => ({
    name: 'register',
    displayName: 'Register',
    error: state.user.error
})

const mapAuthToProps = dispatch => ({
    auth: (username, email, password, formName) => {
        dispatch(auth(username, email, password, formName))
    }
})

// Creating separate components using same Auth Form to keep codebase DRY
export const SignIn = connect(mapSigninToProps, mapAuthToProps)(AuthForm)
export const Register = connect(mapRegisterToProps, mapAuthToProps)(AuthForm)