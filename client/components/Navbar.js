import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {signout} from '../store/user'

const Navbar = ({handleClick, isLoggedIn}) => (
    <div id='navbar'>
        <h1>Trade Track Folio</h1>
        <nav id='navlinks'>
                <NavLink activeClassName='active' to="/transactions">Transactions</NavLink>
                <NavLink activeClassName='active' to="/portfolio">Portfolio</NavLink>
                <a href="/signin" onClick={handleClick}>
                    Sign Out
                </a>
        </nav>
    </div>
)


const mapState = state => ({
    isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
    handleClick() {
        dispatch(signout())
    }
})

export default connect(mapState, mapDispatch)(Navbar)