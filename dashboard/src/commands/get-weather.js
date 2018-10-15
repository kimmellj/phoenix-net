import AppModel from "../models/index.js"

export default class GetWeather {
    static execute( ) {
        fetch( "https://api.openweathermap.org/data/2.5/weather?lat=39.588889&lon=-78.849167&APPID=fba57acc0292647ffb8dda5fd2c38197&units=imperial" )
            .then( ( response ) => {
                return response.json()
            } )
            .then( ( weatherJSON ) => {
                AppModel.setValue( "weatherData", weatherJSON )
            } )
    }
}
