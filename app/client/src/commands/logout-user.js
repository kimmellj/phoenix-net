import AppModel from "../models/index.js"

export default class LogoutUser {
    static execute( ) {
        AppModel.setData( {
            "apiToken": false,
            "loggedInUser": false
        } )
        localStorage.removeItem( "apiToken" )
    }
}
