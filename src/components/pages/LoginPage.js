import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LoginForm from '../forms/LoginForm';
import LoginHeader from '../sections/LoginHeader';
import TopBalanceUsers from '../sections/TopBalanceUsers';
import './styles/LoginPage.css';

export default class LoginPage extends React.Component {
    authenticate = user => {
        /* TODO: DB-Search here, backend url? */
        /* Dispatch Redux action here that tries to authenticate the user */
        const loggedIn = user.username === 'user' && user.password === 'pass';
        return loggedIn;
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
