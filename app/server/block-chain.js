require('env2')('.env')

const path = require('path')
const fs = require('fs-extra')
const Crypto = require('./crypto')

const sha256 = require('sha256')

/**
 * @todo Securing
 * - Generate a new random SSL server side
 * - password protect the ssl with a user enter password
 * - md5 hash the password
 * - new servers have to match the password to decrypt the chain
 * encrypt the chain before sending?
 */

class Block {
  constructor (index, timestamp, data, prevHash) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.prevHash = prevHash
    this.thisHash = sha256(
      this.index + this.timestamp + this.data + this.prevHash
    )
  }
}

class BlockChain {
  constructor (fileName) {
    this.chain = []
    this.queue = []

    if (fileName) {
      fs.accessSync(fileName, fs.constants.R_OK)

      const fileContents = `${fs.readFileSync(fileName)}`

      this.chain = JSON.parse(fileContents)
    } else {
      this.createGenesisBlock()
      this.lastBlock = this.chain[0]
    }
  }

  createGenesisBlock () {
    this.chain.push(new Block(0, Date.now(), 'Genesis BlockChain', '0'))
  }

  saveData (data) {
    this.queue.push({
      timestamp: Date.now(),
      data: data
    })

    if (this.queue.length >= 25) {
      this.nextBlock(JSON.stringify(Crypto.encrypt(JSON.stringify(this.queue))))
      this.queue = []
    }
  }

  nextBlock (data) {
    const block = new Block(
      this.lastBlock.index + 1,
      Date.now(),
      data,
      this.lastBlock.thisHash
    )

    this.chain.push(block)
    this.lastBlock = block

    return block
  }

  getChain (decrypt = false) {
    let returnChain

    if (decrypt) {
      console.log('Decrypting')
      returnChain = this.chain.map((block) => {

        if (block.index !== 0) {
          // console.log(block.data)
          // console.log(Crypto.decrypt(JSON.parse(block.data)).toString())
          block.data = JSON.parse(Crypto.decrypt(JSON.parse(block.data)).toString())
        }

        return block
      })
    } else {
      returnChain = this.chain
    }

    return returnChain
  }

  validate () {
    const clone = this.chain.slice(0)
    const revChain = clone.reverse()

    let prevHash = null
    let intruder = false

    for (let index in revChain) {
      if (revChain[index]) {
        const block = revChain[index]

        if (prevHash === null) {
          prevHash = block.prevHash
          continue
        }

        if (prevHash !== block.thisHash) {
          intruder = true
          break
        }

        prevHash = block.prevHash

        // console.log(block)
      }
    }

    return !intruder
  }

  store (fileName) {
    try {
      const dirName = path.dirname(fileName)

      fs.ensureDirSync(dirName)
      fs.writeFile(fileName, JSON.stringify(this.getChain(), null, 2))
    } catch (e) {
      console.error(e)
      return false
    }

    return true
  }
}

module.exports = BlockChain
