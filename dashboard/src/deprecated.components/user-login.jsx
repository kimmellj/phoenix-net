import React from "react"
import PropTypes from "prop-types"
import Form from "muicss/lib/react/form"
import Input from "muicss/lib/react/input"
import Button from "muicss/lib/react/button"
import Panel from "muicss/lib/react/panel"

class UserLogin extends React.Component {

    constructor() {
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

        this.onChange.bind( this )
    }

    onChange( fieldID, value ) {
        let currentState = this.state

        currentState[ fieldID ].value = value
    }

    render() {
        return <Panel className='login' >
            <Form onSubmit={
                ( ev ) => {
                    ev.preventDefault()
                    this.props.loginUserAction( this.state.email.value, this.state.password.value )
                }
            } >
                <legend>Login</legend>
                <Input placeholder="" label="Email" type="email" floatingLabel={true} required={true} onChange={( ev ) => {
                    this.onChange( "email", ev.target.value )
                }} />
                <Input placeholder="" label="Password" type="password" floatingLabel={true} required={true} onChange={( ev ) => {
                    this.onChange( "password", ev.target.value )
                }} />

                <Button color="primary" variant="raised">Submit</Button>
            </Form> </Panel>
    }
}
UserLogin.propTypes = {
    "loginUserAction": PropTypes.func
}
UserLogin.defaultProps = {

}

export default UserLogin
