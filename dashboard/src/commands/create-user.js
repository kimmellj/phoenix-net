import AppModel from "../models/index.js"

export default class CreateUser {
    static execute( user ) {
        const masterKey = AppModel.getValue( "masterKey" ),
            url = AppModel.getValue( "url" )

        if ( !masterKey || !url ) {
            AppModel.setData( {
                "errorMessage": "Master Key or url was not found"
            } )
        }

        user.access_token = masterKey // eslint-disable-line camelcase
        user.role = "admin"

        AppModel.setData( {
            "errorMessage": false
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
                if ( response.valid && response.valid === false ) {
                    console.log( "not valid" )
                    AppModel.setData( {
                        "errorMessage": response.message
                    } )
                } else {
                    AppModel.saveToLocalStorage( "apiToken", response.token )
                    AppModel.setData( {
                        "apiToken": response.token,
                        "loggedInUser": response.user
                    } )
                }
            } )
    }
}
