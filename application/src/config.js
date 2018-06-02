/* eslint-disable no-unused-vars */
import path from 'path'

/* istanbul ignore next */
const requireProcessEnv = ( name ) => {
  if ( !process.env[ name ] ) {
    throw new Error( 'You must set the ' + name + ' environment variable' )
  }
  return process.env[ name ]
}

/* istanbul ignore next */
const dotenv = require( 'dotenv-safe' )
dotenv.load( {
  path: path.join( __dirname, '../.env' )
} )

console.log( `ENV: ${JSON.stringify(process.env)}` );

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join( __dirname, '..' ),
    port: process.env.PORT || 9000,
    sslPort: process.env.SECURE_PORT || 443,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    defaultEmail: 'no-reply@phoenix-net-api.com',
    sendgridKey: requireProcessEnv( 'SENDGRID_KEY' ),
    masterKey: requireProcessEnv( 'MASTER_KEY' ),
    jwtSecret: requireProcessEnv( 'JWT_SECRET' ),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {
    mongo: {
      uri: 'mongodb://localhost/phoenix-net-api-test',
      options: {
        debug: false
      }
    }
  },
  development: {
    mongo: {
      uri: 'mongodb://localhost/phoenix-net-api-dev',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/phoenix-net-api',
      options: {
        debug: false
      }
    }
  }
}

module.exports = Object.assign( config.all, config[ config.all.env ] )

console.log( `ENV: ${JSON.stringify(process.env, null, 3)}` )
console.log( `Config file: ${JSON.stringify(module.exports, null, 3)}` )

export default module.exports
