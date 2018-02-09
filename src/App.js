import React, { Component } from 'react';
import './App.css';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';

import { connect } from 'react-redux';

class App extends Component {
    render() {
        let page = this.props.loggedIn ? (
            <MainPage token={this.props.access_token} />
        ) : (
            <LoginPage />
        );
        return <div className="App">{page}</div>;
    }
}

const mapStateToProps = state => {
    return {
        access_token: state.authentication.access_token,
        loggedIn: state.authentication.loggedIn
    };
};

export default connect(mapStateToProps)(App);

