import Avatar from "@material-ui/core/Avatar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import CloudIcon from "@material-ui/icons/Cloud"
import PropTypes from "prop-types"
import React from "react"
import WeatherIcon from "react-icons-weather"


const styles = ( theme ) => ( {
    "layout": {
        "width": "auto",
        "display": "block", // Fix IE11 issue.
        "marginLeft": "auto",
        "marginRight": "auto"
    },
    "paper": {
        "marginTop": theme.spacing.unit * 8,
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "padding": `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    "avatar": {
        "margin": theme.spacing.unit,
        "backgroundColor": theme.palette.secondary.main
    },
    "messageList": {
        "width": "100%"
    },
    "form": {
        "width": "100%", // Fix IE11 issue.
        "marginTop": theme.spacing.unit
    },
    "submit": {
        "marginTop": theme.spacing.unit * 3
    },
    "title": {
        "marginBottom": theme.spacing.unit * 3
    }
} )

class Weather extends React.Component {

    constructor( props ) {
        super()

        const { classes } = props

        this.classes = classes
    }

    render() {
        if ( this.props.data === Weather.defaultProps.data ) {
            return (
                <div />
            )
        }

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={this.classes.layout}>
                    <Paper className={this.classes.paper}>
                        <Avatar className={this.classes.avatar}>
                            <CloudIcon />
                        </Avatar>
                        <Typography className={this.classes.title} component="h1" variant="h4">
                            Weather
                        </Typography>
                        <hr />
                        <Grid container spacing={24} className={this.classes.mainGrid}>
                            <Grid item xs={5}>
                                <WeatherIcon name="owm" iconId={`${this.props.data.weather[ 0 ].id}`} />
                            </Grid>
                            <Grid item xs={7} className={this.classes.stats}>
                                <Typography variant="h5" align="right" gutterBottom>{this.props.data.name}, {this.props.data.sys.country}</Typography>
                                <Typography align="right" gutterBottom >{this.props.data.weather[ 0 ].description}</Typography>
                                <Typography align="right" gutterBottom >{this.props.data.main.temp} &deg;F</Typography>
                                <Typography align="right" gutterBottom >{this.props.data.main.pressure} in</Typography>
                                <Typography align="right" gutterBottom >{this.props.data.main.humidity} &#37;</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </main>
            </React.Fragment >
        )
    }
}

Weather.propTypes = {
    "classes": PropTypes.object.isRequired,
    "data": PropTypes.object
}

Weather.defaultProps = {
    "data": { "weather": [ {} ], "sys": {}, "main": {} }
}

export default withStyles( styles )( Weather )
