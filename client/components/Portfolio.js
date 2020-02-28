import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getHoldings, dispatchAddHolding, dispatchUpdateHolding, dispatchAddTransaction} from '../store'
import formatMoney from './FormatMoney'


class Portfolio extends Component {
    constructor() {
        super()
        this.state = {
            ticker: '',
            quantity: 1
        }
    }
    componentDidMount() {
        this.props.getHoldings()
    }

    handleSubmit = async evt => {
        evt.preventDefault()
        const ticker = this.state.ticker.toUpperCase(),
            holdings = this.props.holdings,
            newQuantity = Number(this.state.quantity)
        const status = await this.props.dispatchAddTransaction({ticker, quantity: newQuantity})
        if(status === 400) {
            return alert('Balance too low to complete transaction!')
        }    
        if(holdings[ticker]) {
            const updateQuantity = newQuantity + holdings[ticker].quantity
            this.props.dispatchUpdateHolding(ticker, updateQuantity , holdings)
        }else {
            this.props.dispatchAddHolding({ticker, quantity: newQuantity}, holdings)
        }
    }

    handleChange = () => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const holdings = this.props.holdings,
            {totalValue} = holdings,
            {balance} = this.props
            
        return (
            <div>
                <h1>Portfolio &#40;{formatMoney.format(totalValue/100+balance/100)}&#41;</h1>
                <h3>Cash - {formatMoney.format(balance/100)}</h3>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input name="ticker" type="text" placeholder="Ticker" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input name="quantity" type="number" min={1} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type="submit">Buy</button>
                    </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    balance: state.user.balance,
    holdings: state.holdings
})

const mapDispatchToProps = dispatch => ({
    getHoldings: () => {
        dispatch(getHoldings())
    },
    dispatchAddHolding: (newHolding, userHoldings) => {
        dispatch(dispatchAddHolding(newHolding, userHoldings))
    },
    dispatchUpdateHolding: (ticker, quantity, userHoldings) => {
        dispatch(dispatchUpdateHolding(ticker, quantity, userHoldings))
    },
    dispatchAddTransaction: transaction => {
        return dispatch(dispatchAddTransaction(transaction))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)