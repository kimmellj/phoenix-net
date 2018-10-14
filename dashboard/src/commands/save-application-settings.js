import AppModel from "../models/index.js"

export default class SaveApplicationSettings {
    static execute( masterKey, url ) {
        console.info( `url: ${url}` )
        console.info( `Master Key: ${masterKey}` )


        AppModel.saveToLocalStorage( "url", url )
        AppModel.saveToLocalStorage( "masterKey", masterKey )

        AppModel.setData( {
            "url": url,
            "masterKey": masterKey
        } )

    }
}
