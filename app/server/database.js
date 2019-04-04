const Sequelize = require('sequelize')
const epilogue = require('epilogue')

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  operatorsAliases: false
})

const Message = database.define('messages', {
  type: Sequelize.STRING,
  message: Sequelize.TEXT
})

const initializeDatabase = async (app) => {
  epilogue.initialize({ app, sequelize: database })

  epilogue.resource({
    model: Message,
    endpoints: ['/messages', '/messages/:id']
  })

  await database.sync()
}

module.exports = initializeDatabase
