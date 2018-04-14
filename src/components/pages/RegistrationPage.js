import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LoginHeader from '../sections/LoginHeader';
import './styles/RegistrationPage.css';
import RegisterForm from '../forms/RegisterForm';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class RegistrationPage extends React.Component {
    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/"/>;
        }

        return (
            <div className="registrationPage">
                <Grid fluid>
                    <Row>
                        <Col xs>
                            <LoginHeader />
                        </Col>
                    </Row>
                    <Row className="centered">
                        <Col xs={5}>
                            <RegisterForm shadow={true} />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapDispatchToProps = {

};

const mapStateToProps = state => {
    return {
        loggedIn: state.user.loggedIn
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
