import React from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import Grid from "@material-ui/core/Grid"

import Messages from "./Messages.jsx"
import Weather from "./Weather.jsx"
import Users from "./Users.jsx"
import Servers from "./Servers.jsx"

import GetUsers from "../commands/get-users.js"
import GetUser from "../commands/get-user.js"
import LoadAllServers from "../commands/load-all-servers.js"
import SaveNewMessage from "../commands/save-new-message.js"
import DeleteMessage from "../commands/delete-message.js"
import LoadAllMessages from "../commands/load-all-messages.js"
import GetWeather from "../commands/get-weather.js"

import AppBar from "./AppBar.jsx"

const styles = () => ({
    "dashboard": {
        "width": "100%"
    },
    "mainGrid": {
        "flexGrow": 1
    }
})

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        const { classes } = props

        this.classes = classes
    }

    componentDidMount() {

        LoadAllMessages.execute()
        GetWeather.execute()
        LoadAllServers.execute()

        this.intervals = {
            "servers": setInterval(() => {
                LoadAllServers.execute()
            }, 10000),
            "messages": setInterval(() => {
                if (this.props.requestingMessages === false) {
                    LoadAllMessages.execute()
                }
            }, 500),
            "weather": setInterval(() => {
                GetWeather.execute()
            }, 10000),
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervals.messages)
        clearInterval(this.intervals.weather)
        clearInterval(this.intervals.users)
    }

    render() {
        return (
            <div className={this.classes.dashboard}>
                <AppBar user={this.props.user} logout={this.props.logout} />
                <Grid container spacing={24} className={this.classes.mainGrid}>
                    <Grid item xs={12} lg={4}>
                        {this.props.weatherData ? <Weather data={this.props.weatherData} /> : null}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Messages
                            deleteMessage={(messageID) => {
                                console.log(`Deleting message: ${messageID}`)
                                DeleteMessage.execute(messageID)
                            }}
                            saveNewMessage={(message) => {
                                SaveNewMessage.execute(message)
                            }}
                            messages={this.props.messages}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        {this.props.servers ? <Servers servers={this.props.servers} /> : 'No Servers available ... that cant be right?'}
                    </Grid>
                </Grid>

            </div>
        )
    }
}

Dashboard.propTypes = {
    "classes": PropTypes.object.isRequired,
    "messages": PropTypes.array,
    "servers": PropTypes.array,
    "user": PropTypes.object.isRequired,
    "users": PropTypes.array,
    "weatherData": PropTypes.object,
    "logout": PropTypes.func.isRequired,
    "requestingMessages": PropTypes.boolean
}

export default withStyles(styles)(Dashboard)
