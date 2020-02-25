const Sequelize = require('sequelize')
const db = require('../db')

const Holding = db.define('holding', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ticker: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Holding