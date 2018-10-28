import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import Paper from "@material-ui/core/Paper"
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import LockIcon from "@material-ui/icons/LockOutlined"
import ReportProblemRounded from "@material-ui/icons/ReportProblemRounded"
import PropTypes from "prop-types"
import React from "react"

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

class SignIn extends React.Component {

    constructor( props ) {
        super()
        this.state = {
            "email": {
                "value": "",
                "isEditing": false,
                "triggerValidation": 0
            },
            "password": {
                "value": "",
                "isEditing": false,
                "triggerValidation": 0
            }
        }

        const { classes } = props

        this.classes = classes
    }

    onChange( fieldID, value ) {
        let currentState = this.state

        currentState[ fieldID ].value = value
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={this.classes.layout}>
                    <Paper className={this.classes.paper}>
                        <Avatar className={this.classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1">
                            Sign in
                        </Typography>
                        {( this.props.errorMessage ) ? <Chip
                            icon={<ReportProblemRounded />}
                            label={this.props.errorMessage}
                            onClick={this.handleClick}
                            onDelete={this.handleDelete}
                            className={this.classes.chip}
                            color="secondary"
                        /> : ""}
                        <form
                            className={this.classes.form}
                            onSubmit={( ev ) => {
                                ev.preventDefault()
                                this.props.loginUser( this.state.email.value, this.state.password.value )
                            }}
                        >

                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    required={true}
                                    onChange={( ev ) => {
                                        this.onChange( "email", ev.target.value )
                                    }} />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={( ev ) => {
                                        this.onChange( "password", ev.target.value )
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
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

SignIn.propTypes = {
    "classes": PropTypes.object.isRequired,
    "loginUser": PropTypes.func.isRequired,
    "errorMessage": PropTypes.string
}

export default withStyles( styles )( SignIn )
