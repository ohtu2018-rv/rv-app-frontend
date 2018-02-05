import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LoginForm from '../forms/LoginForm';
import LoginHeader from '../sections/LoginHeader';
import TopBalanceUsers from '../sections/TopBalanceUsers';
import './styles/LoginPage.css';

export default class LoginPage extends React.Component {
    verifyLogin = user => {
        return fetch('https://rv-backend.herokuapp.com/api/v1/user/authenticate', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        }).then(res => res.json())
    }

    authenticate = user => {
        this.verifyLogin(user)
            .then(res => {
                const token = res.access_token;
                if (token) {
                    this.props.setAccessToken(token);
                    return true
                }
                return false;
            })
            .then(loggedIn => {
                loggedIn ? this.props.login() : console.log("Not logged in.")
            });
    };

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
                                authenticate={this.authenticate}
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
