import React, {Component} from 'react'
import {connect} from 'react-redux'


class Portfolio extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>Portfolio</h1>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)