import React from "react";
import SuccessBtn from "../buttons/SuccessBtn";
import { Grid, Row, Col } from "react-flexbox-grid";
import LoginForm from "../forms/LoginForm";
import LoginHeader from "../sections/LoginHeader";
import TopBalanceUsers from "../ui/TopBalanceUsers";
import "./styles/LoginPage.css";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  authenticate = user => {
    /* TODO: DB-Search here, backend url? */
    /* Dispatch Redux action here that tries to authenticate the user */
    const loggedIn = user.username === "user" && user.password === "pass";

    if (loggedIn) {
      this.props.login();
    } else {
      alert("Wrong username/password: " + user.username + "::" + user.password);
      this.setState({ username: "user", password: "pass" });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="loginPage">
        <Grid fluid>
          <Row>
            <Col xs>
              <LoginHeader />
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <LoginForm
                handleSubmit={this.handleSubmit}
                shadow={true}
                authenticate={this.authenticate}
              />
            </Col>
            <Col xs={9} style={{textAlign: 'center'}}>
              <TopBalanceUsers />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
