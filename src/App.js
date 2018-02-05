import React, { Component } from 'react';
import './App.css';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            access_token: ''
        }; /* !! SET:  loggedIn: false for non-demo !!  */
        this.setAccessToken = this.setAccessToken.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    setAccessToken(token) {
        this.setState({ access_token: token });
    }

    login() {
        this.setState({ 
            loggedIn: true
        });
    }

    logout() {
        this.setState({ 
            loggedIn: false,
            access_token: ''
        });
    }

    render() {
        let page = this.state.loggedIn ? (
            <MainPage logout={this.logout} token={this.state.access_token} />
        ) : (
            <LoginPage login={this.login} setAccessToken={this.setAccessToken}/>
        );
        return <div className="App">{page}</div>;
    }
}

export default App;
