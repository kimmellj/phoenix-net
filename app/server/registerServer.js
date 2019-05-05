require('env2')('.env')

const request = require('request-promise')
const Util = require('./util')

const auth = Buffer.from(process.env.AUTH_USER + ':' + process.env.AUTH_PASS).toString('base64')

const registerServer = async () => {
  try {
    const checkResponse = await request({
      uri: 'http://localhost:3000/servers/?q=' + Util.getIPAddress(),
      method: 'GET',
      json: true,
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic ' + auth
      }
    })

    if (checkResponse.length <= 0) {
      const response = await request({
        uri: 'http://localhost:3000/servers',
        method: 'POST',
        body: {
          address: Util.getIPAddress()
        },
        json: true,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic ' + auth
        }
      })

      console.log(response)
    }
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

module.exports = registerServer
