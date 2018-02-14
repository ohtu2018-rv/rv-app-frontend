import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LoginForm from '../forms/LoginForm';
import LoginHeader from '../sections/LoginHeader';
import TopBalanceUsers from '../sections/TopBalanceUsers';
import './styles/LoginPage.css';
import RegisterForm from '../forms/RegisterForm';
import BasicBtn from '../buttons/BasicBtn';

import { connect } from 'react-redux';
import { toggleRegisterVisibility } from './../../reducers/registerReducer';

class LoginPage extends React.Component {
    render() {
        return (
            <div className="loginPage">
                <Grid fluid>
                    <Row>
                        <Col xs>
                            <LoginHeader />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            {!this.props.registerVisible && (
                                <LoginForm shadow={true} />
                            )}
                            {this.props.registerVisible && (
                                <RegisterForm shadow={true} />
                            )}
                        </Col>
                        <Col xs={9} style={{ textAlign: 'center' }}>
                            <TopBalanceUsers />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapDispatchToProps = {
    toggleRegisterVisibility
};

const mapStateToProps = state => {
    return {
        registerVisible: state.register.registerVisible
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
