import Avatar from "@material-ui/core/Avatar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import DeleteIcon from "@material-ui/icons/Delete"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import IconButton from "@material-ui/core/IconButton"
import PropTypes from "prop-types"
import React from "react"
import GetUsers from "../commands/get-users.js"


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
    "userList": {
        "width": "100%"
    },
    "title": {
        "marginBottom": theme.spacing.unit * 3
    }
} )

class Users extends React.Component {

    constructor( props ) {
        super()

        const { classes } = props

        this.classes = classes
    }

    componentDidMount() {
        setInterval( () => {
            GetUsers.execute()
        }, 10000 )
    }

    render() {
        const users = this.props.users.map( ( user, key ) => {
            return <ListItem key={key}>
                <ListItemAvatar>
                    <Avatar>
                        <img src={user.picture} align="middle" className={this.classes.profileImage} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={user.name}
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        } )

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={this.classes.layout}>
                    <Paper className={this.classes.paper}>
                        <Avatar className={this.classes.avatar}>
                            <PersonIcon />
                        </Avatar>
                        <Typography className={this.classes.title} component="h1" variant="h4">
                            Users
                        </Typography>
                        <List className={this.classes.userList}>
                            {users}
                        </List>
                    </Paper>
                </main>
            </React.Fragment >
        )
    }
}

Users.propTypes = {
    "classes": PropTypes.object.isRequired,
    "data": PropTypes.object,
    "users": PropTypes.array
}

Users.defaultProps = {
    "data": { "weather": [ {} ], "sys": {}, "main": {} }
}

export default withStyles( styles )( Users )
