/**
 * @todo it doesn't refresh the data at the end of the request
 * for now, we're just bumping up the frequency of update
 */
import AppModel from "../models/index.js"
import LoadAllMessages from "../commands/load-all-messages.js"

export default class DeleteMessage {
    static execute( messageID ) {
        const masterKey = AppModel.getValue( "masterKey" )

        AppModel.setData( {
            "errorMessage": false
        } )

        fetch( `/messages/${messageID}?access_token=${masterKey}`, {
            "cache": "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            "credentials": "same-origin", // include, same-origin, *omit
            "headers": {
                "user-agent": "Mozilla/4.0 MDN Example",
                "content-type": "application/json"
            },
            "method": "DELETE", // *GET, POST, PUT, DELETE, etc.
            "mode": "cors", // no-cors, cors, *same-origin
            "redirect": "follow", // manual, *follow, error
            "referrer": "no-referrer" // *client, no-referrer
        } )
            .then( ( response ) => {
                if ( response.ok ) {
                    // LoadAllMessages.execute( )
                } else {
                    AppModel.setData( {
                        "errorMessage": "There was a problem deleting this message!"
                    } )
                }
            } )
    }
}
