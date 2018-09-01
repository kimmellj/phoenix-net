const dotenv = require( 'dotenv-safe' ),
  path = require( 'path' ),
  fetch = require( 'node-fetch' )

dotenv.load( {
  path: path.join( __dirname, '../../.env' ),
  sample: path.join( __dirname, '../../.env.example' )
} )

export default class CreateUser {
  static async execute( user ) {

    const masterKey = process.env.MASTER_KEY,
      domain = 'http://localhost:3000'

    user.access_token = masterKey // eslint-disable-line camelcase
    user.role = "admin"

    let finalResponse = null

    await fetch( `${domain}/users`, {
        "body": JSON.stringify( user ), // must match 'Content-Type' header
        "cache": "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        "credentials": "same-origin", // include, same-origin, *omit
        "headers": {
          "user-agent": "Mozilla/4.0 MDN Example",
          "content-type": "application/json"
        },
        "method": "POST", // *GET, POST, PUT, DELETE, etc.
        "mode": "cors", // no-cors, cors, *same-origin
        "redirect": "follow", // manual, *follow, error
        "referrer": "no-referrer" // *client, no-referrer
      } )
      .then( ( response ) => response.json() )
      .then( ( response ) => {
        finalResponse = response
      } )

      return finalResponse
  }
}
