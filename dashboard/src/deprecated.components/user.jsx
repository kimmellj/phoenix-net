import React from "react"
import PropTypes from "prop-types"

import UserLogin from "./user-login.jsx"
import UserCreate from "./user-create.jsx"
import UserProfile from "./user-profile.jsx"

import Button from "muicss/lib/react/button"
import Container from "muicss/lib/react/container"
import Panel from "muicss/lib/react/Panel"
import Row from "muicss/lib/react/row"
import Col from "muicss/lib/react/col"

import { AddIcon } from "react-icons/md"
import { BackspaceIcon } from "react-icons/md"

class User extends React.Component {

    constructor() {
        super()

        this.state = {
            "showCreate": false
        }
    }

    renderButtons() {
        let rightButton = null,
            leftButton = null

        if ( !this.state.showCreate && this.props.loggedInUser ) {
            leftButton = <Button
                variant="fab"
                color="accent"
                onClick={( ev ) => {
                    ev.preventDefault()
                    this.props.logoutUser()
                }}>
                <BackspaceIcon />
            </Button>
        }


        if ( this.state.showCreate ) {
            rightButton = <Button variant="flat" color="accent" onClick={( ev ) => {
                ev.preventDefault()
                this.setState( {
                    "showCreate": false
                } )
            }}>Cancel</Button>
        } else {
            rightButton = <Button variant="fab" color="primary" onClick={( ev ) => {
                ev.preventDefault()
                this.setState( {
                    "showCreate": true
                } )
            }}><AddIcon /></Button>
        }

        return <Panel>
            <Container fluid={true}>
                <Row>
                    <Col xs="6" md="12" lg="6" className="mui--text-center">{leftButton}</Col>
                    <Col xs="6" md="12" lg="6" className="mui--text-center">{rightButton}</Col>
                </Row>
            </Container>
        </Panel>
    }

    renderCompnent() {
        if ( this.state.showCreate ) {
            return <UserCreate createUserAction={this.props.createUserAction} />
        }

        if ( this.props.loggedInUser ) {
            return <UserProfile user={this.props.loggedInUser} />
        }

        return <UserLogin loginUserAction={this.props.loginUserAction} />
    }

    render() {

        return <div className="user">
            {this.renderCompnent()}
            {this.renderButtons()}
        </div>

    }
}
User.propTypes = {
    "createUserAction": PropTypes.func,
    "loginUserAction": PropTypes.func,
    "loggedInUser": PropTypes.object
}
User.defaultProps = {
}

export default User
