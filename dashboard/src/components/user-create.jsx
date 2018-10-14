import React from "react"
import PropTypes from "prop-types"
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'

class UserCreate extends React.Component {

    constructor() {
        super()
        this.state = {
            fields: {
                name: {
                    value: 'Jamie',
                    isEditing: false,
                    triggerValidation: 0
                },
                email: {
                    value: 'jamie@jkimmell.com',
                    isEditing: false,
                    triggerValidation: 0
                },
                password: {
                    value: 'jamiejamie',
                    isEditing: false,
                    triggerValidation: 0
                },
                passwordConfirm: {
                    value: 'jamiejamie',
                    isEditing: false,
                    triggerValidation: 0
                }
            }
        }

        this.onChange.bind( this )
    }

    onChange( fieldID, value ) {
        let currentState = this.state
        currentState[fieldID].value = value
    }

    isFieldRequired( val, name ) {
        return val && typeof val === 'string' && val.length > 0;
    }

    onChange( fieldID, value ) {
        let currentState = this.state
        currentState.fields[fieldID].value = value
    }

    render() {
        const fields = [
            'name',
            'email',
            'password',
            'passwordConfirm'
        ]
        const labels = {
            'name': 'Name',
            'email': 'Email',
            'password': 'Password',
            'passwordConfirm': 'Confirm Password'
        }

        const types = {
            'name': 'text',
            'email': 'email',
            'password': 'password',
            'passwordConfirm': 'password'
        }

        const formElements = fields.map( ( fieldID, index ) => {
            return <Input key="index" placeholder="" label={labels[fieldID]} type={types[fieldID]} floatingLabel={true} required={true} defaultValue={this.state.fields[fieldID].value} onChange={( ev ) => {
                this.onChange( fieldID, ev.target.value )
            }} />
        } )

        return <div className='create'>
            <Form onSubmit={( ev ) => {
                ev.preventDefault()
                this.props.createUserAction( {
                    name: this.state.fields.name.value,
                    email: this.state.fields.email.value,
                    password: this.state.fields.password.value
                } )
            }}>
                <legend>Title</legend>
                {formElements}
                <Button variant="raised">Submit</Button>
            </Form>
        </div>
    }
}
UserCreate.propTypes = {
    "createUserAction": PropTypes.func
}
UserCreate.defaultProps = {

}

export default UserCreate
