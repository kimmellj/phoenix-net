import React from "react"
import PropTypes from "prop-types"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import ListIcon from "@material-ui/icons/List"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

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
    }
} )

class Messages extends React.Component {

    constructor( props ) {
        super()
        this.state = {
            "value": "",
            "isEditing": false,
            "triggerValidation": 0
        }

        this.onChange.bind( this )

        const { classes } = props

        this.classes = classes
    }

    onChange( value ) {
        let currentState = this.state

        currentState.value = value
    }

    render() {
        const messages = this.props.messages.map( ( message, index ) => {
            const updatedAt = new Date( message.updatedAt ),
                todaysDate = new Date().toLocaleDateString( "en-US" )

            let updatedDate = updatedAt.toLocaleDateString( "en-US" )

            if ( updatedDate === todaysDate ) {
                updatedDate = updatedAt.toLocaleTimeString( "en-US" )
            }

            return <ListItem key={index}>
                <ListItemText primary={message.text} secondary={updatedDate} />
                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="Delete"
                        onClick={
                            ( ev ) => {
                                ev.preventDefault()
                                this.props.deleteMessage( message.id )
                            }
                        }
                    >
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
                            <ListIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Messages
                        </Typography>
                        <form
                            className={this.classes.form}
                            onSubmit={( ev ) => {
                                ev.preventDefault()
                                ev.preventDefault()
                                this.props.saveNewMessage( this.state.value )
                                document.getElementById( "new-message-input" ).value = ""
                            }}
                        >
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Name</InputLabel>
                                <Input
                                    id="new-message-input"
                                    name="message"
                                    autoFocus
                                    onChange={( ev ) => {
                                        this.onChange( ev.target.value )
                                    }}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.classes.submit}
                            >
                                Save
                            </Button>
                        </form>
                        <List className={this.classes.messageList}>
                            {messages}
                        </List>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

Messages.propTypes = {
    "classes": PropTypes.object.isRequired,
    "saveNewMessage": PropTypes.func,
    "deleteMessage": PropTypes.func,
    "messages": PropTypes.array
}

Messages.defaultProps = {

}

export default withStyles( styles )( Messages )
