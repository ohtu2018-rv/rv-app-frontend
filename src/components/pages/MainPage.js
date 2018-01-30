import React, { Component } from "react";
import { Header } from "../sections/Header";
import { Content } from "../sections/Content";

class MainPage extends Component {
  constructor(props) { /* REMOVE contructer after demo 1 */ 
    super(props);
    this.state = {
      user: {
        username: "",
        full_name: "",
        email: "",
        account_balance: 0,
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTczNTI1ODgsImRhdGEiOnsidXNlcm5hbWUiOiJub3JtYWxfdXNlciIsInJvbGVzIjpbInVzZXIiXX0sImlhdCI6MTUxNzI2ODA0MX0.ooZfzrRnQX2NH3VrblVdUvmL8gP2eOxi2e-W9szZPdQ"
    }
    this.buy = this.buy.bind(this)
  }

  getUser() {
    return fetch('http://rv-backend.herokuapp.com/api/v1/user/account', {
      headers: new Headers({
        'Authorization': `Bearer ${this.state.token}` /* HUOM fancyt ` -sulut, "hipsusulut" */
      })
    }).then((res) => res.json())
  }

  handleKeyPress = event => {
    switch (event.keyCode) {
      case 13:
        this.props.logout();
        break;
      default:
        console.log(event.keyCode);
    }
  };

  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress);
    this.getUser().then((user) => {
      this.setState({ user: user })
      console.log(this.state.user)
    })
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  reduceBalance(cost) {
    return fetch('http://rv-backend.herokuapp.com/api/v1/user/account/debit', {
      method: "POST",
      headers: new Headers({
        'Authorization': `Bearer ${this.state.token}`, /* HUOM fancyt ` -sulut, "hipsusulut" */
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        amount: cost
      })
    }).then((res) => res.json())
  }

  buy(cost) {
    this.reduceBalance(cost).then((updatedUser) => {
      let user = Object.assign(this.state.user);
      user.account_balance = updatedUser.account_balance;
      this.setState({ user: user });
      console.log(this.state.user)
    });
  }

  render() {
    return (
      <div>
        <Header logout={this.props.logout} user={this.state.user}/>
        <Content buy={this.buy} />
      </div>
    );
  }
}

export default MainPage;
