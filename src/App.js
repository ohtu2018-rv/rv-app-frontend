import React, { Component } from 'react';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import NotificationDrawer from './components/helpers/NotificationDrawer';

import { connect } from 'react-redux';

class App extends Component {
    render() {
        let page = this.props.loggedIn ? <MainPage /> : <LoginPage />;
        return (
            <div className="App">
                <NotificationDrawer
                    notifications={this.props.notifications}
                    products={this.props.products}
                />
                {page}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        access_token: state.authentication.access_token,
        loggedIn: state.authentication.loggedIn,
        notifications: state.notification.notifications,
        products: state.notification.purchasedItems
    };
};

export default connect(mapStateToProps)(App);
