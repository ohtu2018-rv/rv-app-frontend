import React from 'react';
import './styles/LoginForm.css';

import SuccessBtn from './../buttons/SuccessBtn';

import { connect } from 'react-redux';
import { login, setLoggingIn } from './../../reducers/authenticationReducer';
import {
    handleInputEvent,
    reset,
    focusPasswordField,
    setLogging
} from './../../reducers/loginReducer';

// Remove for something smarter
let timeout;

class LoginForm extends React.Component {
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        document.addEventListener('keypress', this.handleKeyPress);
        this.usernameInput.focus();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
        document.removeEventListener('keypress', this.handleKeyPress);
        clearTimeout(timeout);
        this.props.reset();
    }

    wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

    nextStep = async () => {
        if (this.props.loginStep === 1) {
            this.props.focusPasswordField();
            this.passwordInput.focus();
        } else if (this.props.loginStep === 2) {
            this.props.setLogging();
            this.props.setLoggingIn();

            // Replace timeout with something smarter
            timeout = setTimeout(() => {
                this.props.reset();
            }, 2000);

            this.props.authenticate({
                username: this.props.username,
                password: this.props.password
            });

            /* authenticate does't return a boolean
            if (
                !this.props.authenticate({
                    username: this.props.username,
                    password: this.props.password
                })
            ) {
                this.setprops({
                    loginStep: 1,
                    usernameDisabled: false,
                    passwordDisabled: true,
                    submitDisabled: true,
                    username: '',
                    password: '',
                    loader: false
                });
                this.usernameInput.focus();
            } else {
                clearTimeout(timeout)
            */
        }
    };

    handleKeyPress = event => {
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

    render() {
        return (
            <div
                className={
                    this.props.shadow
                        ? 'form form-shadow loginForm'
                        : 'form loginForm'
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
                            value={this.props.username}
                            onChange={event =>
                                this.props.handleInputEvent(event)
                            }
                            onKeyDown={this.handleKeyUp}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            disabled={this.props.usernameDisabled}
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
                            value={this.props.password}
                            onChange={event =>
                                this.props.handleInputEvent(event)
                            }
                            onKeyDown={this.handleKeyUp}
                            className="input fullWidth"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            disabled={this.props.passwordDisabled}
                            ref={input => {
                                this.passwordInput = input;
                            }}
                        />
                    </div>
                    <div className="formControl">
                        <SuccessBtn
                            fill
                            loader={this.props.loader}
                            disabled={
                                !(
                                    !this.props.submitDisabled &&
                                    this.props.password.length >
                                        this.props.minPasswordLength
                                )
                            }
                            style={{ width: '100%' }}
                        >
                            Kirjaudu sisään (ENTER)
                        </SuccessBtn>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    login,
    setLoggingIn,
    reset,
    handleInputEvent,
    focusPasswordField,
    setLogging
};

const mapStateToProps = state => {
    return {
        username: state.login.username,
        password: state.login.password,
        minPasswordLength: state.login.minPasswordLength,
        loginStep: state.login.loginStep,
        usernameDisabled: state.login.usernameDisabled,
        passwordDisabled: state.login.passwordDisabled,
        submitDisabled: state.login.submitDisabled,
        loader: state.login.loader
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
