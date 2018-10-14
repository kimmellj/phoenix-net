import AppModel from "../models/index.js"
import LoadAllMessages from "../commands/load-all-messages.js"

export default class GetUser {
    static execute() {
        AppModel.setValue( "errorMessage", false )

        fetch( `${AppModel.getValue( "url" )}/users/me?access_token=${AppModel.getValue( "apiToken" )}`, {
            "cache": "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            "credentials": "same-origin", // include, same-origin, *omit
            "headers": {
                "user-agent": "Mozilla/4.0 MDN Example",
                "content-type": "application/json"
            },
            "method": "GET", // *GET, POST, PUT, DELETE, etc.
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
                    AppModel.setValue( "loggedInUser", response )
                    console.log( "Load all messages from get user" )
                    LoadAllMessages.execute()
                }
            } )
    }
}
