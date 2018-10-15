import React from "react"
import PropTypes from "prop-types"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import SettingsRemote from "@material-ui/icons/SettingsRemote"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"

const styles = ( theme ) => ( {
    "layout": {
        "width": "auto",
        "display": "block", // Fix IE11 issue.
        "marginLeft": theme.spacing.unit * 3,
        "marginRight": theme.spacing.unit * 3,
        [ theme.breakpoints.up( 400 + theme.spacing.unit * 3 * 2 ) ]: {
            "width": 400,
            "marginLeft": "auto",
            "marginRight": "auto"
        }
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
    "form": {
        "width": "100%", // Fix IE11 issue.
        "marginTop": theme.spacing.unit
    },
    "submit": {
        "marginTop": theme.spacing.unit * 3
    }
} )

class APISettings extends React.Component {

    constructor( props ) {
        super()
        this.state = {
            "value": "",
            "isEditing": false,
            "triggerValidation": 0,
            "fields": {
                "masterKey": "",
                "url": ""
            }
        }
        const { classes } = props

        this.classes = classes

        this.onChange.bind( this )
    }

    onChange( fieldID, value ) {
        let currentState = this.state

        currentState.fields[ fieldID ] = value
        this.setState( currentState )
    }

    render() {

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={this.classes.layout}>
                    <Paper className={this.classes.paper}>
                        <Avatar className={this.classes.avatar}>
                            <SettingsRemote />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            API Settings
                        </Typography>
                        <form
                            className={this.classes.form}
                            onSubmit={( ev ) => {
                                ev.preventDefault()
                                this.props.saveAPISettings(
                                    this.state.fields.masterKey,
                                    `${this.state.fields.url}`
                                )
                            }}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="masterKey">Master Key</InputLabel>
                                <Input
                                    id="masterKey"
                                    name="masterKey"
                                    autoFocus
                                    defaultValue={this.state.fields.masterKey}
                                    onChange={( ev ) => {
                                        this.onChange( "masterKey", ev.target.value )
                                    }}
                                />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="url">URL</InputLabel>
                                <Input
                                    id="url"
                                    name="url"
                                    defaultValue={this.state.fields.url}
                                    onChange={( ev ) => {
                                        this.onChange( "url", ev.target.value )
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
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

APISettings.propTypes = {
    "classes": PropTypes.object.isRequired,
    "saveAPISettings": PropTypes.func
}

export default withStyles( styles )( APISettings )
