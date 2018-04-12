import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LoginForm from '../forms/LoginForm';
import LoginHeader from '../sections/LoginHeader';
import TopBalanceUsers from '../sections/TopBalanceUsers';
import './styles/LoginPage.css';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/"/>;
        }

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
                            <LoginForm shadow={true} />
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

const mapDispatchToProps = {};

const mapStateToProps = state => {
    return {
        loggedIn: state.user.loggedIn
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
