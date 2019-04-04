require( 'dotenv' ).config()
const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const http = require('http')
const https = require('https')
const path = require( 'path' )
const fs = require('fs');

var os = require( 'os' );
var ifaces = os.networkInterfaces();

const initializeDatabase = require( './database' )

const app = express()
app.use( bodyParser.json() )

const getIP = () => {
  let results = []
  Object.keys( ifaces ).forEach( function ( ifname ) {
    var alias = 0;

    ifaces[ ifname ].forEach( function ( iface ) {
      if ( 'IPv4' !== iface.family || iface.internal !== false ) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if ( alias >= 1 ) {
        // this single interface has multiple ipv4 addresses
        results.push( ifname + ':' + alias, iface.address );
      } else {
        // this interface has only one ipv4 adress
        results.push( ifname, iface.address );
      }
      ++alias;
    } );
  } );

  return results.join( '\n' )
}

const startServer = async () => {
  await initializeDatabase( app )

  app.use( '/', express.static( path.join( __dirname, '..', 'client', 'dist' ) ) )

  if (process.env.NODE_ENV === 'production') {
    const sslOptions = {
      key: fs.readFileSync("/etc/letsencrypt/archive/phoenix-net.jkimmell.com/privkey1.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/archive/phoenix-net.jkimmell.com/fullchain1.pem"),
      ca: fs.readFileSync("/etc/letsencrypt/archive/phoenix-net.jkimmell.com/chain1.pem")
    }

    const serverSSL = https.createServer(sslOptions, app);
    serverSSL.listen( 443 );
  } else {
    const server = http.createServer(app);
    server.listen( 3000 );
  }
}

startServer()
