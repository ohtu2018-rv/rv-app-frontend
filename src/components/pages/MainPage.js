import React, { Component } from "react";
import { Header } from "../sections/Header";
import { Content } from "../sections/Content";

class MainPage extends Component {
  constructor(props) {
    /* REMOVE contructer after demo 1 */

    super(props);
    this.state = {
      user: {
        username: "",
        full_name: "",
        email: "",
        account_balance: 0
      },
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTczNTI1ODgsImRhdGEiOnsidXNlcm5hbWUiOiJub3JtYWxfdXNlciIsInJvbGVzIjpbInVzZXIiXX0sImlhdCI6MTUxNzI2ODA0MX0.ooZfzrRnQX2NH3VrblVdUvmL8gP2eOxi2e-W9szZPdQ",
      product: null
    };
    this.buy = this.buy.bind(this);
  }

  getUser() {
    return fetch("http://rv-backend.herokuapp.com/api/v1/user/account", {
      headers: new Headers({
        Authorization: `Bearer ${
          this.state.token
        }` /* HUOM fancyt ` -sulut, "hipsusulut" */
      })
    }).then(res => res.json());
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
    this.getUser().then(user => {
      this.setState({ user: user });
      console.log(this.state.user);
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  reduceBalance(product) {
    return fetch("http://rv-backend.herokuapp.com/api/v1/user/account/debit", {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${
          this.state.token
        }` /* HUOM fancyt ` -sulut, "hipsusulut" */,
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        amount: product.price
      })
    }).then(res => res.json());
  }

  buy(product) {
    this.reduceBalance(product).then(updatedUser => {
      let user = Object.assign(this.state.user);
      user.account_balance = updatedUser.account_balance;
      this.setState({ user: user });
      this.notifyPurchase(product);
      console.log(this.state.user);
    });
  }

  notifyPurchase = product => {
    this.setState({ product });
    setTimeout(() => this.setState({ product: null }), 3000);
  };

  render() {
    return (
      <div>
        <Header
          logout={this.props.logout}
          user={this.state.user}
          buy={this.buy}
        />
        <Content product={this.state.product} />
      </div>
    );
  }
}

export default MainPage;
