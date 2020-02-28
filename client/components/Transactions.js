import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store'
import formatMoney from './FormatMoney'


class Transactions extends Component {
    componentDidMount() {
        this.props.getTransactions()
    }

    render() {
        const {transactions} = this.props
        return (
            <div>
                <div className='heading'>
                    <h1>Transactions</h1>
                </div>
                <div id='transaction-table-container'>
                    <table id="transaction-table">
                        <tbody>
                        {/* render a table row for each transaction */}
                        {transactions.map((transaction, idx) => {
                            return (
                                <tr key={idx} className="transaction">
                                    <td>BUY &#40;{transaction.ticker}&#41; - </td>
                                    <td className='right'>
                                        {transaction.quantity} Shares {' @ ' + formatMoney.format(transaction.pricePaid)}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
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
