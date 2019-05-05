const fs = require('fs')
const BlockChain = require('./block-chain')

const localFile = './test-blockchain.json'

test('Should create a new blockchain', () => {
  const blockChain = new BlockChain()
  let chain

  for (let i = 0; i < 30000; i++) {
    blockChain.saveData({
      'timestamp': Date.now(),
      'action': 'log',
      'message': `Add this to the log message: ${Math.random()}`
    })
  }

  chain = blockChain.getChain(true)

  chain.forEach((block) => {
    if (block.index === 0) {
      expect(block.data).toBe('Genesis BlockChain')
    } else {
      block.data.forEach((record) => {
        expect(record.data.message).toEqual(expect.stringContaining('Add this to the log message:'))
      })
    }
  })
})

test('Should store / load the chain successfully', () => {
  const localFile = './another-test-blockchain.json'

  const blockChain = new BlockChain()

  for (let i = 0; i < 3; i++) {
    blockChain.saveData({
      'timestamp': Date.now(),
      'action': 'log',
      'message': `Add this to the log message: ${Math.random()}`
    })
  }

  expect(blockChain.store(localFile)).toBe(true)

  expect(fs.accessSync(localFile, fs.constants.R_OK | fs.constants.W_OK))

  const newBlockChain = new BlockChain(localFile)

  const chain = newBlockChain.getChain(true)

  expect(chain).toHaveLength(2)

  chain.forEach((block) => {
    if (block.index === 0) {
      expect(block.data).toBe('Genesis BlockChain')
    } else {
      block.data.forEach((record) => {
        expect(record.data.message).toEqual(expect.stringContaining('Add this to the log message:'))
      })
    }
  })
})
