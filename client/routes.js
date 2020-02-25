import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {SignIn, Register, Transactions, Portfolio} from './components'
import {getMe} from './store/user'


class Routes extends Component {
    componentDidMount() {
        this.props.getMe()
    }

    render() {
        const {isLoggedIn} = this.props

        return (
            <Switch>
                <Route path="/register" component={Register} />
                {
                    !isLoggedIn ? 
                        <Route component={SignIn} /> 
                    : (
                        <Switch>
                            <Route path="/transactions" component={Transactions} />
                            <Route component={Portfolio} />
                        </Switch>
                    )
                }
            </Switch>
        )
    }
}


const mapState = state => ({
    // Double-bang ensures any user ID equates to true. No user is still always falsey.
    isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
    getMe: () => {
        dispatch(getMe())
    }
})

// withRouter makes sure updates can still happen if the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))