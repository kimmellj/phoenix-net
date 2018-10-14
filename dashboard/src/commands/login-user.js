import AppModel from "../models/index.js"
import LoadAllMessages from "../commands/load-all-messages.js"

export default class LoginUser {
    static execute( email, password ) {
        AppModel.setValue( "errorMessage", false )

        fetch( `${AppModel.getValue( "url" )}/auth`, {
            "body": JSON.stringify( {
                "access_token": AppModel.getValue( "masterKey" )
            } ), // must match 'Content-Type' header
            "cache": "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            "credentials": "same-origin", // include, same-origin, *omit
            "headers": {
                "user-agent": "Mozilla/4.0 MDN Example",
                "content-type": "application/json",
                "Authorization": `Basic ${ btoa( `${email }:${ password}` )}`
            },
            "method": "POST", // *GET, POST, PUT, DELETE, etc.
            "mode": "cors", // no-cors, cors, *same-origin
            "redirect": "follow", // manual, *follow, error
            "referrer": "no-referrer" // *client, no-referrer
        } )
            .then( ( response ) => response.json() )
            .then( ( response ) => {
                if ( response.valid && response.valid === false ) {
                    console.log( "not valid" )
                    AppModel.setValue( "errorMessage", response.message )
                } else {
                    AppModel.saveToLocalStorage( "apiToken", response.token )
                    AppModel.setData( {
                        "apiToken": response.token,
                        "loggedInUser": response.user
                    } )

                    LoadAllMessages.execute()
                }
            } )
    }
}
