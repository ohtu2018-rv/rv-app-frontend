import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LoginForm from '../forms/LoginForm';
import LoginHeader from '../sections/LoginHeader';
import TopBalanceUsers from '../sections/TopBalanceUsers';
import './styles/LoginPage.css';

import { connect } from 'react-redux';
import { login } from './../../reducers/authenticationReducer';

class LoginPage extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
    };

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
                            <LoginForm
                                handleSubmit={this.handleSubmit}
                                shadow={true}
                                authenticate={this.props.login}
                                login={this.props.login}
                            />
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
    login
};

const mapStateToProps = state => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
