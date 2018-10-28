import React from "react"
import PropTypes from "prop-types"
import Form from "muicss/lib/react/form"
import Input from "muicss/lib/react/input"
import Button from "muicss/lib/react/button"
import Panel from "muicss/lib/react/panel"
import Container from "muicss/lib/react/container"

class ApplicationSettings extends React.Component {

    constructor() {
        super()
        this.state = {
            "fields": {
                "masterKey": {
                    "value": "",
                    "isEditing": false,
                    "triggerValidation": 0
                },
                "url": {
                    "value": "",
                    "isEditing": false,
                    "triggerValidation": 0
                }
            }
        }

        this.onChange.bind( this )
    }

    onChange( fieldID, value ) {
        let currentState = this.state

        currentState.fields[ fieldID ].value = value
        this.setState( currentState )
    }

    isFieldRequired( val ) {
        return val && typeof val === "string" && val.length > 0
    }

    render() {
        const fields = [
                "masterKey",
                "url"
            ],
            labels = {
                "masterKey": "Master Token",
                "url": "URL"
            },

            types = {
                "url": "text",
                "masterKey": "password"
            },

            formElements = fields.map( ( fieldID, index ) => {
                return <Input key={index} placeholder="" label={labels[ fieldID ]} type={types[ fieldID ]} floatingLabel={true} required={true} defaultValue={this.state.fields[ fieldID ].value} onChange={( ev ) => {
                    this.onChange( fieldID, ev.target.value )
                }} />
            } )

        return <Container><Panel className='application-settings'>
            <Form onSubmit={( ev ) => {
                ev.preventDefault()
                this.props.saveApplicationSettings(
                    this.state.fields.masterKey.value,
                    `${this.state.fields.url.value}`
                )
            }}>
                <legend>Application Settings</legend>
                {formElements}
                <Button variant="raised">Submit</Button>
            </Form>
        </Panel></Container>
    }
}
ApplicationSettings.propTypes = {
    "saveApplicationSettings": PropTypes.func
}
ApplicationSettings.defaultProps = {

}

export default ApplicationSettings
