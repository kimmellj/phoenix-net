import Chip from "@material-ui/core/Chip"
import deepOrange from "@material-ui/core/colors/deepOrange"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import withStyles from "@material-ui/core/styles/withStyles"
import ReportProblemRounded from "@material-ui/icons/ReportProblemRounded"
import PropTypes from "prop-types"
import React from "react"
import CreateUser from "../commands/create-user.js"
import GetUser from "../commands/get-user.js"
import LoginUser from "../commands/login-user.js"
import LogoutUser from "../commands/logout-user.js"
import SaveApplicationSettings from "../commands/save-application-settings.js"
import APISettings from "../componets/APISettings.jsx"
import Dashboard from "../componets/Dashboard.jsx"
import SignIn from "../componets/SignIn.jsx"
import UserForm from "../componets/UserForm.jsx"
import AppModel from "../models/index.js"
import "../styles/index.scss"

const styles = ( theme ) => ( {
        "layout": {
            "width": "auto",
            "display": "block", // Fix IE11 issue.
            "marginLeft": theme.spacing.unit * 3,
            "marginRight": theme.spacing.unit * 3,
            [ theme.breakpoints.up( 400 + theme.spacing.unit * 3 * 2 ) ]: {
                "width": "95%",
                "marginLeft": "auto",
                "marginRight": "auto"
            }
        },
        "userForms": {
            "flexGrow": 1
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
        "chip": {
            "margin": theme.spacing.unit,
            "padding": `${theme.spacing.unit * 2}px`
        },
        "submit": {
            "marginTop": theme.spacing.unit * 3
        }
    } ),

    theme = createMuiTheme( {
        "typography": {
            "useNextVariants": true
        },
        "palette": {
            "primary": deepOrange,
            "secondary": deepOrange
        }
    } )

class App extends React.Component {
    constructor( props ) {
        super( props )

        this.state = AppModel.subscribe( this )

        const { classes } = props

        this.classes = classes
    }


    handleDelete() {
        alert( "You clicked the delete icon." ) // eslint-disable-line no-alert
    }

    handleClick() {
        alert( "You clicked the Chip." ) // eslint-disable-line no-alert
    }

    // componentDidMount() {
    //     if ( this.state.apiToken ) {
    //         GetUser.execute()
    //     }
    // }

    showAPISetings() {
        return <APISettings
            saveAPISettings={( masterKey, url ) => {
                SaveApplicationSettings.execute( masterKey, url )
            }}
        />
    }

    showUser() {
        return <div className={this.classes.userForms}>
            <Grid container spacing={24}>
                <Grid item md={6}>
                    <SignIn
                        loginUser={( email, password ) => {
                            LoginUser.execute( email, password )
                        }}
                        errorMessage={this.state.signInErrorMessage}
                    />
                </Grid>
                <Grid item md={6}>
                    <UserForm
                        createUserAction={( user ) => {
                            CreateUser.execute( user )
                        }}
                        errorMessage={this.state.createUserErrorMessage}
                    />
                </Grid>
            </Grid>
        </div>
    }

    showDashboard() {
        return <Dashboard
            user={this.state.loggedInUser}
            users={this.state.users}
            messages={this.state.messages}
            logout={() => {
                LogoutUser.execute()
            }}
            weatherData={this.state.weatherData} />
    }

    render() {
        let toShow, errorMessage

        if ( this.state.errorMessage ) {
            errorMessage = <Chip
                icon={<ReportProblemRounded />}
                label={this.state.errorMessage}
                onClick={this.handleClick}
                onDelete={this.handleDelete}
                className={this.classes.chip}
                color="secondary"
            />
        }

        // if ( this.state.masterKey && this.state.url && !this.state.loggedInUser ) {
        //     toShow = this.showUser()
        // } else if ( this.state.loggedInUser ) {
        //     toShow = this.showDashboard()
        // } else {
        //     toShow = this.showAPISetings()
        // }

        toShow = this.showDashboard()

        return <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <main className={this.classes.layout}>
                {errorMessage}
                {toShow}
            </main>
        </MuiThemeProvider>

    }
}

App.propTypes = {
    "classes": PropTypes.object.isRequired
}

export default withStyles( styles )( App )
