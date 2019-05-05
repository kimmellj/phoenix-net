const Sequelize = require('sequelize')
const epilogue = require('epilogue')

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  operatorsAliases: false,
  logging: false
})

const Servers = database.define('servers', {
  address: Sequelize.STRING
})

const Message = database.define('messages', {
  type: Sequelize.STRING,
  message: Sequelize.TEXT
})

const initializeDatabase = async (app, blockChain) => {
  epilogue.initialize({ app, sequelize: database })

  const messageResource = epilogue.resource({
    model: Message,
    endpoints: ['/messages', '/messages/:id']
  })

  messageResource.create.write.after(function (req, res, context) {
    const blockData = {
      'resource': 'messages',
      'action': 'create',
      'dataValues': context.instance.dataValues,
      'prevValues': context.instance._previousDataValues
    }
    console.log(blockChain.saveData(blockData))
  })

  messageResource.delete.write(function (req, res, context) {
    const blockData = {
      'resource': 'messages',
      'action': 'delete',
      'dataValues': context.criteria
    }
    console.log(blockChain.addBlock(blockData))
  })

  epilogue.resource({
    model: Servers,
    endpoints: ['/servers', '/servers/:address']
  })

  await database.sync()
}

module.exports = initializeDatabase
