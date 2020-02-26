import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getHoldings, dispatchAddHolding, dispatchUpdateHolding} from '../store'
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

    handleSubmit = evt => {
        evt.preventDefault()
        const ticker = this.state.ticker
        if(this.props.holdings[ticker]) {
            this.props.dispatchUpdateHolding(ticker, this.state.quantity, this.props.holdings)
        }else {
            this.props.dispatchAddHolding(this.state, userHoldings)
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
                <h1>Portfolio &#40;{formatMoney.format(totalValue/100+balance)}&#41;</h1>
                <h3>Cash - {formatMoney.format(balance)}</h3>

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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)