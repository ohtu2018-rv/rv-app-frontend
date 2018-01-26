import React, { Component } from 'react';
import { Header } from '../sections/Header';
import { Content } from '../sections/Content';  

export class MainPage extends Component {
  handleKeyPress = (event) => {
      switch(event.keyCode) {
          case 13:
              this.props.logout();
              break;
          default:
              console.log(event.keyCode);
      }
  }

  componentDidMount(){
      document.addEventListener("keypress", this.handleKeyPress);
  }

  componentWillUnmount() {
      document.removeEventListener("keypress", this.handleKeyPress)
      console.log("removed eventListener mainPage")
  }

  render() {
    return (
      <div>
        <Header logout={this.props.logout} />
        <Content />
      </div>
    );
  }
}

