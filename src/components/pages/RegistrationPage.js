import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import './styles/RegistrationPage.css';
import RegisterForm from '../forms/RegisterForm';
import Header from '../sections/Header';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class RegistrationPage extends React.Component {
    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/"/>;
        }

        return (
            <div className="registrationPage">
                <Header />
                <Row className="centered">
                    <Col xs={5}>
                        <RegisterForm shadow={true} />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = {

};

const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
