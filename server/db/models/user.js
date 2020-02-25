const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        // Using getters to privatize password and salt in Sequelize.
        get() {
            return () => this.getDataValue('password')
        }
    },
    salt: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('salt')
        }
    },
    balance: {
        type: Sequelize.INTEGER,
        defaultValue: 5000
    }
})

module.exports = User


User.prototype.correctPassword = function(pwd) {
    return User.encryptPassword(pwd, this.salt()) === this.password()
}


User.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
}

// Using crypto to create a SHA256 hash encryption based on the user's password and salt.
// This helps to make sure that even the exact same passwords don't look the same after being hashed.
User.encryptPassword = function(text, salt) {
    return crypto
    .createHash('RSA-SHA256')
    .update(text)
    .update(salt)
    .digest('hex')
}


const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password(), user.salt())
    }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
