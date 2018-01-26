import React, { Component } from 'react';
import './App.css';
import { MainPage } from './components/pages/MainPage';
import { LoginPage } from './components/pages/LoginPage';   

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
    this.changeUserState = this.changeUserState.bind(this);
  }

  changeUserState() {
    this.setState({ loggedIn: !this.state.loggedIn });
  }

  render() {
    let page = this.state.loggedIn ?
        <MainPage logout={this.changeUserState} /> : 
        <LoginPage login={this.changeUserState}/>; 
    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
