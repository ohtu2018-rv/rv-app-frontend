import React from "react";
import SuccessBtn from "../buttons/SuccessBtn";
import "./styles/LoginPage.css";
import { Grid, Row, Col } from "react-flexbox-grid";
import LoginForm from "./../inputs/LoginForm";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "user", password: "pass" };
    this.handleInputEvent = this.handleInputEvent.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  authenticate() {
    /* TODO: DB-Search here, backend url? */
    const loggedIn =
      this.state.username === "user" && this.state.password === "pass";

    if (loggedIn) {
      this.props.login();
    } else {
      alert("Wrong username/password.");
      this.setState({ username: "user", password: "pass" });
    }
  }

  handleKeyPress = event => {
    switch (event.keyCode) {
      case 13:
        this.authenticate();
        break;
      default:
        console.log(event.keyCode);
    }
  };

  handleInputEvent(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col>Rikkaimmat käyttäjät</Col>
            <Col>Aktiivisimmat käyttäjät</Col>
            <Col>
              <LoginForm />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const styles = {
  content: {
    height: "100%",
    width: "100%",
    position: "absolute"
  },
  loginButton: {
    marginTop: 5,
    marginRight: 5,
    float: "right"
  },
  loginForm: {
    marginTop: 5,
    marginLeft: 5,
    float: "left"
  }
};
