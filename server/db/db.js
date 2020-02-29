const Sequelize = require('sequelize')
const pkg = require('../../package.json')


const databaseName = pkg.name + (process.env.NODE_ENV === 'production' ? '-test' : '')
let db

if(process.env.NODE_ENV === 'production'){
    db = new Sequelize(
        'ttp', 'postgres', process.env.POSTGRES_PWD,
        {
            logging: false,
            host: process.env.POSTGRES_HOST,
            dialect: 'postgres'
        }
    )
}
else{
    db = new Sequelize(
        process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
        {
            logging: false
        }
    )
}



module.exports = db