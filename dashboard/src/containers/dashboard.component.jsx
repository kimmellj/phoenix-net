import React from "react"
import Container from "muicss/lib/react/container"
import Row from "muicss/lib/react/row"
import Col from "muicss/lib/react/col"
import Appbar from "muicss/lib/react/appbar"
import Button from "muicss/lib/react/button"
import BatteryAlertIcon from "react-icons/lib/md/battery-alert"
import PhoenixIcon from "-!babel-loader!svg-react-loader!../img/phoenix-icon.svg"


import LoginUser from "../commands/login-user.js"
import GetUser from "../commands/get-user.js"
import CreateUser from "../commands/create-user.js"
import SaveNewMessage from "../commands/save-new-message.js"
import DeleteMessage from "../commands/delete-message.js"
import SaveApplicationSettings from "../commands/save-application-settings.js"
import LogoutUser from "../commands/logout-user.js"

import AppModel from "../models/index.js"

import User from "../components/user.jsx"
import Messages from "../components/messages.jsx"
import ApplicationSettings from "../components/application-settings.jsx"

export default class Dashboard extends React.Component {
    constructor( props ) {
        super( props )

        this.state = AppModel.subscribe( this )
    }

    componentDidMount() {
        GetUser.execute()

    }

    renderInterface() {
        console.log( "interface" )
        const messages = ( this.state.loggedInUser ) ? <Messages
            deleteMessage={( messageID ) => {
                DeleteMessage.execute( messageID )
            }}
            saveNewMessage={( message ) => {
                SaveNewMessage.execute( message )
            }}
            messages={this.state.messages}
        /> : null

        return <Container fluid={true}>
            <Row>
                <Col md="4" className="left">
                    <User
                        loginUserAction={( email, password ) => {
                            LoginUser.execute( email, password )
                        }}
                        createUserAction={( user ) => {
                            CreateUser.execute( user )
                        }}
                        logoutUser={() => {
                            LogoutUser.execute()
                        }}
                        loggedInUser={this.state.loggedInUser}
                    />
                </Col>
                <Col md="8" className="right">
                    {messages}
                </Col>
            </Row>
        </Container>
    }

    render() {
        let content = null,
            s1 = { "verticalAlign": "middle" },
            s2 = { "textAlign": "right" }

        if ( this.state.masterKey ) {
            content = this.renderInterface()
        } else {
            content = <ApplicationSettings saveApplicationSettings={( masterKey, url ) => {
                SaveApplicationSettings.execute( masterKey, url )
            }} />
        }

        return <div className="dashboard">
            <Appbar>
                <table width="100%">
                    <tbody>
                        <tr style={s1}>
                            <td className="mui--appbar-height">
                                <PhoenixIcon height={100} width={100} />
                                <h1>Phoenix Net</h1>
                            </td>
                            <td className="mui--appbar-height" style={s2}>
                                <Button
                                    size="small"
                                    variant="flat"
                                    className="wipe-button"
                                    onClick={
                                        ( ev ) => {
                                            ev.preventDefault()
                                            AppModel.wipeLocalStorage()
                                            AppModel.setData( {
                                                "masterKey": false,
                                                "apiToken": false,
                                                "url": false
                                            } )
                                        }
                                    }>
                                    Self Destruct
                                    <BatteryAlertIcon />
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Appbar>

            <div className="error-message">{this.state.errorMessage}</div>

            {content}
        </div>
    }
}
