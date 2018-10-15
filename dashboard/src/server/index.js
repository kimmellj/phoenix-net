require( "env2" )( `${__dirname}/../../config.json` )

const UpdateEvents = require( "./update-events" ),
    UpdateBackground = require( "./update-background" ),
    log = require( "pretty-log" ),
    express = require( "express" ),
    app = express(),
    updateBackground = new UpdateBackground()

app.use( express.static( `${__dirname}/../../dist` ) )
app.listen( 3000, () => console.log( "Example app listening on port 3000!" ) )

updateBackground.refresh( null, ( error ) => {
    if ( error ) {
        log.error( error )
        return
    }

    updateBackground.getRandomBackground().then( () => {
        setInterval( () => {
            log.success( "Selecting Random Background ..." )
            updateBackground.getRandomBackground( )
        }, 1000 * 30 )
    } )


} )

setInterval( () => {
    UpdateEvents.execute()
}, 1000 * 60 * 5 )

UpdateEvents.execute()
