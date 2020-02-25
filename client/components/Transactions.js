import React, {Component} from 'react'
import {connect} from 'react-redux'


class Transactions extends Component {
    componentDidMount() {
        // this.props.getData()
    }

    render() {
        return (
            <div>
                <h1>Transactions</h1>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
