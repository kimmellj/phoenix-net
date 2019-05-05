class Model {

    constructor() {
        let url = "/"

        this.data = {
            "hostName": "titan.lan",
            "dateTime": null,
            "ipAddress": null,
            "personalEvents": [],
            "workEvents": "test",
            "cryptoCoins": [],
            "weatherData": null,
            "errorMessage": null,
            "signInErrorMessage": null,
            "createUserErrorMessage": null,
            "loggedInUser": {},
            "messages": [],
            "servers": [],
            "users": [],
            "masterKey": localStorage.getItem( "masterKey" ),
            "apiToken": localStorage.getItem( "apiToken" ),
            "url": url,
            "requestingMessages": false
        }

        this.localStorageKeys = []


        /**
     * Build an empty list of subscribers
     * @type {Array}
     */
        this.subscribers = []
    }

    subscribe( callback ) {
        this.subscribers.push( callback )
        return this.data
    }

    getValue( key ) {
        return this.data[ key ]
    }

    setValue( key, value ) {
        this.data[ key ] = value

        this.updateSubscribers()
    }

    wipeLocalStorage() {
        localStorage.clear()
    }

    saveToLocalStorage( key, value ) {
        this.localStorageKeys.push( key )

        localStorage.setItem( key, value )
    }

    getFromLocalStorage( key ) {
        return localStorage.getItem( key )
    }

    setData( params ) {
        for ( let key in params ) {
            this.data[ key ] = params[ key ]
        }

        this.updateSubscribers()
    }

    updateSubscribers() {
        for ( let subscriber of this.subscribers ) {
            subscriber.setState( this.data )
        }
    }

    getData() {
        return this.data
    }
}

let ModelInstance = new Model()

export default ModelInstance
