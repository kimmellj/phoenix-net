import React from "react"
import PropTypes from "prop-types"
import Container from "muicss/lib/react/container"
import Panel from "muicss/lib/react/panel"
import Col from "muicss/lib/react/col"

class UserLogin extends React.Component {

    render() {
        return <Panel className='profile' >
            <Container fluid={true}>
                <Col lg="4"><img src={this.props.user.picture} align="middle" /></Col>
                <Col lg="8"><h3>Welcome<br />{this.props.user.name}</h3></Col>
            </Container>
        </Panel>
    }
}
UserLogin.propTypes = {
    "user": PropTypes.object
}
UserLogin.defaultProps = {

}

export default UserLogin
