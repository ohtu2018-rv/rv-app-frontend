import React, { Component } from 'react';
import './App.css';
import { Header } from './components/sections/Header';
import { Content } from './components/sections/Content';  

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    );
  }
}

export default App;
