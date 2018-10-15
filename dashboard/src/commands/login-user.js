import AppModel from "../models/index.js"
import GetUser from "./get-user.js"

export default class LoginUser {
    static execute( email, password ) {
        AppModel.setValue( "signInErrorMessage", null )

        fetch( `${AppModel.getValue( "url" )}/auth`, {
            "body": JSON.stringify( {
                "access_token": AppModel.getValue( "masterKey" )
            } ), // must match 'Content-Type' header
            "cache": "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // "credentials": "same-origin", // include, same-origin, *omit
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
            .then( ( response ) => {
                if ( !response.ok ) {
                    throw new Error( "Invalid Login!" )
                }

                return response.json()
            } )
            .then( ( response ) => {
                if ( response.hasOwnProperty( "valid" ) && response.valid === false ) {
                    AppModel.setValue( "signInErrorMessage", "Login failed!" )
                } else {
                    AppModel.saveToLocalStorage( "apiToken", response.token )
                    // AppModel.saveToLocalStorage( "loggedInUser", JSON.stringify( response.user ) )
                    AppModel.setData( {
                        "apiToken": response.token
                    } )

                    GetUser.execute()
                }
            } )
            .catch( ( e ) => {
                AppModel.setValue( "signInErrorMessage", e.toString() )
            } )
    }
}
