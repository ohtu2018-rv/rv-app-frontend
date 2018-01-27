import React from "react";
import SuccessBtn from "../buttons/SuccessBtn";
import LoginForm from "../inputs/LoginForm";
import "./styles/LoginPage.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      minUsernameLength: 8,
      password: "",
      minPasswordLength: 2,
      usernameDisabled: false,
      passwordDisabled: true,
      submitDisabled: true,
      loginStep: 1
    };
    this.handleInputEvent = this.handleInputEvent.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  authenticate() {
    /* TODO: DB-Search here, backend url? */
    /* Dispatch Redux action here that tries to authenticate the user */
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
    console.log("handleKeyPress", event.keyCode);
    switch (event.keyCode) {
      case 13:
        event.preventDefault();
        this.nextStep();
        break;
      case 9:
        event.preventDefault();
        this.nextStep();
        break;
      default:
        break;
    }
  };

  nextStep = () => {
    if (this.state.loginStep == 1) {
      this.setState({
        loginStep: 2,
        usernameDisabled: true,
        passwordDisabled: false,
        submitDisabled: false
      });
    } else if (this.state.loginStep == 2) {
      // Do login
      this.authenticate();
      this.setState({
        loginStep: 1,
        usernameDisabled: false,
        passwordDisabled: true,
        submitDisabled: true,
        username: "",
        password: ""
      });
    }
  };

  handleInputEvent(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  render() {
    return (
      <div className="loginWrap">
        <LoginForm
          usernameDisabled={this.state.usernameDisabled}
          passwordDisabled={this.state.passwordDisabled}
          submitDisabled={
            !(
              !this.state.submitDisabled &&
              this.state.password.length > this.state.minPasswordLength
            )
          }
          handleInputEvent={this.handleInputEvent}
          username={this.state.username}
          password={this.state.password}
          handleSubmit={this.handleSubmit}
          shadow={true}
          handleKeyUp={this.handleKeyPress}
        />
      </div>
    );
  }
}

export default LoginPage;
