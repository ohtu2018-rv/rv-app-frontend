import React, { Component } from 'react';
import { Header } from '../sections/Header';
import { Content } from '../sections/Content';  

export class MainPage extends Component {
  render() {
    return (
      <div>
        <Header logout={this.props.logout} />
        <Content />
      </div>
    );
  }
}

