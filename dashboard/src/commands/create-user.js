import AppModel from "../models/index.js"

export default class CreateUser {
    static execute( user ) {
        const masterKey = AppModel.getValue( "masterKey" ),
            url = AppModel.getValue( "url" )

        if ( !masterKey || !url ) {
            AppModel.setData( {
                "createUserErrorMessage": "Master Key or url was not found"
            } )
        }

        user.access_token = masterKey // eslint-disable-line camelcase
        user.role = "admin"

        AppModel.setData( {
            "createUserErrorMessage": null
        } )

        fetch( `${url}/users`, {
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
                if ( response.hasOwnProperty( "valid" ) && response.valid === false ) {
                    AppModel.setValue( "createUserErrorMessage", response.message )
                } else {
                    AppModel.saveToLocalStorage( "apiToken", response.token )
                    AppModel.setData( {
                        "apiToken": response.token,
                        "loggedInUser": response.user
                    } )
                }
            } )
            .catch( ( e ) => {
                AppModel.setValue( "createUserErrorMessage", e.toString() )
            } )
    }
}
