import AppModel from "../models/index.js"
import LoadAllMessages from "../commands/load-all-messages.js"

export default class DeleteMessage {
    static execute( messageID ) {
        const masterKey = AppModel.getValue( "masterKey" ),
            url = AppModel.getValue( "url" )

        AppModel.setData( {
            "errorMessage": false
        } )

        fetch( `${url}/messages/${messageID}?access_token=${masterKey}`, {
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
                    LoadAllMessages.execute( )
                } else {

                    console.log( "not valid" )
                    AppModel.setData( {
                        "errorMessage": "There was a problem deleting this message!"
                    } )
                }
            } )
    }
}
