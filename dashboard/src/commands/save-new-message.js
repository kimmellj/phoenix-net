import LoadAllMessages from "./load-all-messages"
import AppModel from "../models/index.js"


export default class SaveNewMessage {
    static execute( message ) {
        const apiToken = AppModel.getValue( "apiToken" ),
            url = AppModel.getValue( "url" )

        AppModel.setData( {
            "errorMessage": false
        } )

        fetch( `${url}/messages?access_token=${apiToken}`, {
            "body": JSON.stringify( {
                "text": message
            } ), // must match 'Content-Type' header
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
                    AppModel.setData( {
                        "errorMessage": response.message
                    } )
                } else {
                    LoadAllMessages.execute()
                }
            } )
    }
}
