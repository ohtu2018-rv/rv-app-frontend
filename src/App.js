import React, { Component } from 'react';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import RegistrationPage from './components/pages/RegistrationPage';
import NotificationDrawer from './components/helpers/NotificationDrawer';

import { connect } from 'react-redux';

import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            rest.authenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

class App extends Component {
    render() {
        return (
            <div className="App">
                <NotificationDrawer
                    notifications={this.props.notifications}
                    products={this.props.products}
                />
                <Router>
                    <div>
                        <AuthenticatedRoute exact path="/" authenticated={this.props.loggedIn} component={MainPage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegistrationPage}/>
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.user.loggedIn,
        notifications: state.notification.notifications,
        products: state.notification.purchasedItems
    };
};

export default connect(mapStateToProps)(App);
