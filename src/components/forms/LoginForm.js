import React from "react";
import "./styles/LoginForm.css";

import SuccessBtn from "./../buttons/SuccessBtn";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      minUsernameLength: 8,
      minPasswordLength: 2,
      usernameDisabled: false,
      passwordDisabled: true,
      submitDisabled: true,
      loader: false,
      loginStep: 1
    };
    this.handleInputEvent = this.handleInputEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.addEventListener("keypress", this.handleKeyPress);
    this.usernameInput.focus();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

  nextStep = async () => {
    if (this.state.loginStep === 1) {
      this.setState({
        loginStep: 2,
        usernameDisabled: true,
        passwordDisabled: false,
        submitDisabled: false
      });
      this.passwordInput.focus();
    } else if (this.state.loginStep === 2) {
      this.setState({
        usernameDisabled: true,
        passwordDisabled: true,
        loader: true
      });
      await this.wait(1000);
      // Do login
      if(!(this.props.authenticate({
        username: this.state.username,
        password: this.state.password
      }))) {
        this.setState({
          loginStep: 1,
          usernameDisabled: false,
          passwordDisabled: true,
          submitDisabled: true,
          username: "",
          password: "",
          loader: false
        });
        this.usernameInput.focus();
      } else {
        this.props.login();
      }
    }
  };

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

  handleInputEvent(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  render() {
    return (
      <div
        className={
          this.props.shadow ? "form form-shadow loginForm" : "form loginForm"
        }
      >
        <form onSubmit={this.props.handleSubmit}>
          <legend>Log in</legend>
          <div className="formControl">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Käyttäjätunnus"
              value={this.state.username}
              onChange={this.handleInputEvent}
              onKeyDown={this.handleKeyUp}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              className="input fullWidth"
              disabled={this.state.usernameDisabled}
              ref={input => {
                this.usernameInput = input;
              }}
            />
          </div>
          <div className="formControl">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Salasana"
              value={this.state.password}
              onChange={this.handleInputEvent}
              onKeyDown={this.handleKeyUp}
              className="input fullWidth"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              disabled={this.state.passwordDisabled}
              ref={input => {
                this.passwordInput = input;
              }}
            />
          </div>
          <div className="formControl">
            <SuccessBtn
              fill
              loader={this.state.loader || this.props.loader}
              disabled={
                !(
                  !this.state.submitDisabled &&
                  this.state.password.length > this.state.minPasswordLength
                )
              }
              style={{ width: "100%" }}
            >
              Kirjaudu sisään (ENTER)
            </SuccessBtn>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
