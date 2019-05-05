require('env2')('.env')

const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const https = require('https')
const path = require('path')
const fs = require('fs')
const basicAuth = require('basic-auth-connect')

const initializeDatabase = require('./database')
const registerServer = require('./registerServer')

const startServer = async () => {
  const app = express()
  console.log([process.env.AUTH_USER, process.env.AUTH_PASS])
  app.use(basicAuth(process.env.AUTH_USER, process.env.AUTH_PASS))
  app.use(bodyParser.json())
  await initializeDatabase(app)

  app.use('/', express.static(path.join(__dirname, '..', 'client', 'dist')))

  if (process.env.NODE_ENV === 'production') {
    const sslOptions = {
      key: fs.readFileSync(process.env.SSL_KEY),
      cert: fs.readFileSync(process.env.SSL_CERT),
      ca: fs.readFileSync(process.env.SSL_CA)
    }

    const serverSSL = https.createServer(sslOptions, app)
    serverSSL.listen(443)
  } else {
    const server = http.createServer(app)
    server.listen(3000)
  }

  registerServer()
}

startServer()
