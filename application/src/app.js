import http from 'http'
import https from 'https'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import fs from 'fs'

const app = express(apiRoot, api)
const server = http.createServer(app)

const privateKey = `${__dirname}/../certs/privatekey.pem`;
const certificate = `${__dirname}/../certs/certificate.pem`;
const chain = `${__dirname}/../certs/chain.pem`;

mongoose.connect(mongo.uri, { useMongoClient: true })
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })

  if ( env === 'production' ) {
    const options = {
        key: fs.readFileSync( privateKey ),
        cert: fs.readFileSync( certificate ),
        ca: fs.readFileSync( chain )
      };
    const serverSSL = https.createServer( options, app );
    serverSSL.listen( 443 );
  }

})

export default app
