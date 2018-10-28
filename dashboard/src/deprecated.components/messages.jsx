import React from "react"
import PropTypes from "prop-types"
import Form from "muicss/lib/react/form"
import Container from "muicss/lib/react/container"
import Col from "muicss/lib/react/col"
import Panel from "muicss/lib/react/panel"
import Input from "muicss/lib/react/input"
import Button from "muicss/lib/react/button"
import { DeleteIcon } from "react-icons/md"

class Messages extends React.Component {

    constructor() {
        super()
        this.state = {
            "value": "",
            "isEditing": false,
            "triggerValidation": 0
        }

        this.onChange.bind( this )
    }

    onChange( value ) {
        let currentState = this.state

        currentState.value = value
    }

    render() {
        this.props.messages.sort( ( a, b ) => {
            const aDate = Date.parse( a.updatedAt ),
                bDate = Date.parse( b.updatedAt )

            return aDate < bDate ? 1 : -1
        } )

        const messages = this.props.messages.map( ( message, index ) => {
            const updatedAt = new Date( message.updatedAt ),
                todaysDate = new Date().toLocaleDateString( "en-US" )

            let updatedDate = updatedAt.toLocaleDateString( "en-US" )

            if ( updatedDate === todaysDate ) {
                updatedDate = updatedAt.toLocaleTimeString( "en-US" )
            }

            return <li key={index} className="message">
                <Container fluid={true}>
                    <Col md="10"> <div className="updated-time">{updatedDate}</div>{message.text}</Col>
                    <Col md="2" className="mui--text-right">
                        <Button
                            size="small"
                            variant="fab"
                            color="danger"
                            onClick={
                                ( ev ) => {
                                    ev.preventDefault()
                                    this.props.deleteMessage( message.id )
                                }
                            }
                        ><DeleteIcon /></Button>
                    </Col>
                </Container>
            </li>
        } )

        return <Panel className='messages' >
            <Form onSubmit={
                ( ev ) => {
                    ev.preventDefault()
                    this.props.saveNewMessage( this.state.value )
                    document.getElementById( "new-message-input" ).value = ""
                }
            } >
                <Input placeholder="" label="Message" id="new-message-input" type="text" floatingLabel={true} required={true} onChange={( ev ) => {
                    this.onChange( ev.target.value )
                }} />
                <div className="mui--text-right"><Button color="primary" variant="raised">Submit</Button></div>
                <hr />
                <ul className="mui-list--unstyled">
                    {messages}
                </ul>
            </Form>
        </Panel>
    }
}
Messages.propTypes = {
    "saveNewMessage": PropTypes.func,
    "deleteMessage": PropTypes.func,
    "messages": PropTypes.array
}
Messages.defaultProps = {

}

export default Messages
