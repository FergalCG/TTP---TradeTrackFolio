import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store'


class Transactions extends Component {
    componentDidMount() {
        this.props.getTransactions()
    }

    render() {
        const {transactions} = this.props
        return (
            <div>
                <h1>Transactions</h1>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getTransactions: () => {
        dispatch(getTransactions())
    }
})

const mapStateToProps = state => ({
    transactions: state.transactions
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
