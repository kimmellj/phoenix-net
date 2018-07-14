import http from 'http'
import https from 'https'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import fs from 'fs'

const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect(mongo.uri, { useMongoClient: true })
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
