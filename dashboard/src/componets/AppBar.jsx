import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"

const styles = {
    "root": {
        "flexGrow": 1
    },
    "profileImage": {
        "maxHeight": "3rem",
        "borderRadius": "50%"
    },
    "appName": {
        "flexGrow": 1,
        "fontFamily": "'Spicy Rice', cursive",
        "fontSize": "3rem"
    },
    "menuButton": {
        "marginLeft": -12,
        "marginRight": 20
    }
}

class DashboardAppBar extends React.Component {
    constructor( props ) {
        super( props )

        const { classes } = props

        this.classes = classes

        this.state = {
            "auth": true,
            "anchorEl": null
        }

        this.handleMenu.bind( this )
        this.handleClose.bind( this )
    }


    handleMenu( event ) {
        this.setState( { "anchorEl": event.currentTarget } )
    }

    handleClose() {
        this.setState( { "anchorEl": null } )
    }

    render() {
        const { classes } = this.props,
            anchorEl = ( this.state && this.state.anchorEl ) ? this.state.anchorEl : null,
            open = Boolean( anchorEl )

        return (
            <div className={this.classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.appName}>
                            Phoenix Net
                        </Typography>

                        <div>
                            <IconButton
                                aria-owns={open ? "menu-appbar" : null}
                                aria-haspopup="true"
                                onClick={( event ) => {
                                    this.handleMenu( event )
                                }}
                                color="inherit"
                            >
                                <img src={this.props.user.picture} align="middle" className={classes.profileImage} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    "vertical": "top",
                                    "horizontal": "right"
                                }}
                                transformOrigin={{
                                    "vertical": "top",
                                    "horizontal": "right"
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={() => {
                                    this.handleClose()
                                    this.props.logout()
                                }}>Logout</MenuItem>
                            </Menu>
                        </div>

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

DashboardAppBar.propTypes = {
    "classes": PropTypes.object.isRequired,
    "user": PropTypes.object.isRequired,
    "logout": PropTypes.func.isRequired
}

export default withStyles( styles )( DashboardAppBar )
