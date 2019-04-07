import React from "react"
import PropTypes from "prop-types"
import Avatar from "@material-ui/core/Avatar"
import CssBaseline from "@material-ui/core/CssBaseline"
import ListIcon from "@material-ui/icons/List"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"

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
    "serverList": {
        "width": "100%"
    },
    "form": {
        "width": "100%", // Fix IE11 issue.
        "marginTop": theme.spacing.unit
    },
    "submit": {
        "marginTop": theme.spacing.unit * 3
    }
} )

class Servers extends React.Component {

    constructor( props ) {
        super()
        this.state = {
        }

        const { classes } = props

        this.classes = classes
    }

    render() {
        const servers = this.props.servers ? this.props.servers.map( ( server, index ) => {
            const updatedAt = new Date( server.updatedAt ),
                todaysDate = new Date().toLocaleDateString( "en-US" )

            let updatedDate = updatedAt.toLocaleDateString( "en-US" )

            if ( updatedDate === todaysDate ) {
                updatedDate = updatedAt.toLocaleTimeString( "en-US" )
            }

            return <ListItem key={index}>
                <ListItemText primary={server.address} secondary={updatedDate} />
            </ListItem>
        } ) : ""

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={this.classes.layout}>
                    <Paper className={this.classes.paper}>
                        <Avatar className={this.classes.avatar}>
                            <ListIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Servers
                        </Typography>
                        <List className={this.classes.serverList}>
                            {servers}
                        </List>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

Servers.propTypes = {
    "classes": PropTypes.object.isRequired,
    "servers": PropTypes.array
}

Servers.defaultProps = {

}

export default withStyles( styles )( Servers )
