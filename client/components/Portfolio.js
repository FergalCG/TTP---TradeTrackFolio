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
        if(status === 400) return alert('Balance too low to complete transaction!')
        else if(status === 404) return alert('Could not find a stock with that ticker!')
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

    setColor = (change) => {
        let color
        if(change > 0) color = 'green'
        else if(change < 0) color = 'red'
        else color = 'grey'
        return color
    }

    render() {
        const {holdings, balance} = this.props,
            {totalValue} = holdings,
            holdingTickers = totalValue > 0 ? Object.keys(holdings).filter(key => key !== 'totalValue') : []

            
        return (
            <div>
                <div className='heading'>
                    <h1>Portfolio &#40;{formatMoney.format(totalValue/100+balance/100)}&#41;</h1>
                </div>
                
                <div id='portfolio-container'>

                    <div id="portfolio">
                        <div id='portfolio-table-container'>
                            {holdingTickers.length ? 
                                <table id='portfolio-table'>
                                    <tbody>
                                        {holdingTickers.map((ticker, idx) => {
                                            const color = this.setColor(holdings[ticker].change)
                                            return (
                                                <tr key={idx} className={color}>
                                                    <td>
                                                        {ticker} - {holdings[ticker].quantity} Shares @ {formatMoney.format(holdings[ticker].value/holdings[ticker].quantity/100)}
                                                    </td>
                                                    <td className='right'>
                                                        {formatMoney.format(holdings[ticker].value/100)}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                : <p>It looks like you don't have any holdings yet!</p>
                            }
                        </div>

                        {holdingTickers.length ? 
                            <small id='portfolio-attribution-link'>
                                <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
                            </small> : null}
                    </div>

                    <div id='portfolio-divider' />

                    <div id='portfolio-right-side'>
                        <h2>Cash - {formatMoney.format(balance/100)}</h2>
                        <div id='portfolio-form-container'>
                            <form onSubmit={this.handleSubmit}>
                                <input name='ticker' type='text' placeholder='Ticker' onChange={this.handleChange}/>
                                <input name='quantity' type='number' placeholder='Quantity' min={1} onChange={this.handleChange}/>
                                <button id='buy-button' type='submit'>Buy</button>
                            </form>
                        </div>
                    </div>
                </div>
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