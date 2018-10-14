const shell = require( "shelljs" )

class UpdateEvent {
    static execute() {
        const workEventsCommand = [
                `mkdir -p ${process.env.CALENDAR_EVENTS_DIR} &&`,
                process.env.CALENDAR_GCAL,
                "--configFolder",
                process.env.CALENDAR_GCAL_WORK_CONFIG,
                "--nocolor",
                "--calendar",
                process.env.CALENDAR_GCAL_WORK_CALENDAR,
                "agenda",
                ">",
                `${process.env.CALENDAR_EVENTS_DIR}work-events.txt`
            ],
            homeEventsCommand = [
                `mkdir -p ${process.env.CALENDAR_EVENTS_DIR} &&`,
                process.env.CALENDAR_GCAL,
                "--configFolder",
                process.env.CALENDAR_GCAL_HOME_CONFIG,
                "--nocolor",
                "--calendar",
                process.env.CALENDAR_GCAL_HOME_CALENDAR,
                "agenda",
                ">",
                `${process.env.CALENDAR_EVENTS_DIR}home-events.txt`
            ]


        console.log( homeEventsCommand.join( " " ) )

        shell.exec( `${workEventsCommand.join( " " )}`, ( code, sdout, stderr ) => {
            if ( code !== 0 ) {
                console.error( stderr )
            }
        } )
        shell.exec( `${homeEventsCommand.join( " " )}`, ( code, stdout, stderr ) => {
            if ( code !== 0 ) {
                console.error( stderr )
            }
        } )
    }
}

module.exports = UpdateEvent
