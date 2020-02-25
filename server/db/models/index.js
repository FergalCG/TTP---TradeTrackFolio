const db = require('../')
const User = require('./user')
const Holding = require('./holding')
const Stock = require('./stock')
const Transaction = require('./transaction')

// Associations
User.hasMany(Holding),
Holding.belongsTo(User)

User.hasMany(Transaction)
Transaction.belongsTo(User)


module.exports = {
    db,
    User,
    Holding,
    Transaction
}