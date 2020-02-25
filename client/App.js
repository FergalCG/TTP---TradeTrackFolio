import React from 'react'
import Navbar from './components/Navbar'
import Routes from './routes'
import { connect } from 'react-redux'

const App = ({isLoggedIn}) => {
    return (
        <div>
            {
                isLoggedIn ? 
                    <Navbar />
                : 
                    null
            }
            <Routes />
        </div>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: !!state.user.id
})

export default connect(mapStateToProps)(App)