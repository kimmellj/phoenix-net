import AppModel from "../models/index.js"

export default class LoadAllMessages {
    static execute( ) {
        const apiToken = AppModel.getValue( "apiToken" ),
            user = AppModel.getValue( "loggedInUser" )

        AppModel.setValue( "errorMessage", false )

        fetch( `/messages?access_token=${apiToken}&user=${user.ID}`, {
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
                AppModel.setValue( "messages", response )
            } )
    }
}
