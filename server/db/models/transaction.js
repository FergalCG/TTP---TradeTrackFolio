const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
    pricePaid: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    ticker: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Transaction