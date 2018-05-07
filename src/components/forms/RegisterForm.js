import React from 'react';
import './styles/LoginForm.css';
import SuccessBtn from './../buttons/SuccessBtn';
import { connect } from 'react-redux';

import { 
    handleInputEvent, 
    reset,
    focusPasswordField,
    setRegistering,
    focusPasswordConfirmField,
    checkPasswordsMatch
} from './../../reducers/registerReducer';

import {
    successMessage,
    errorMessage
} from '../../reducers/notificationReducer';

import { loggedIn } from '../../reducers/authenticationReducer';
import userService from '../../services/userService';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValid = this.formValid.bind(this);
    }

    componentDidMount() {
        this.registerUsernameInput.focus();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    formValid() {
        return (
            this.props.registerUsername.length >= this.props.minUsernameLength &&
            (this.props.passwordsMatch && this.props.registerPassword.length >= this.props.minPasswordLength) &&
            this.props.registerRealname.length > 0 &&
            this.props.registerEmail.split('@').length === 2
        );
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (this.formValid()) {
            try {
                // Register new user
                const response = await userService.registerUser({
                    username: this.props.registerUsername,
                    password: this.props.registerPassword,
                    realname: this.props.registerRealname,
                    email: this.props.registerEmail
                });

                // registration successful, log in
                if (response.status === 201) {
                    const loginResponse = await userService.authenticate({
                        username: this.props.registerUsername,
                        password: this.props.registerPassword
                    });

                    this.props.reset();
                    this.props.loggedIn(loginResponse.data.access_token);
                } else {
                    this.props.errorMessage('Unknown error during registration');
                }
            } catch (error) {
                if (error.response.data.error) {
                    this.props.errorMessage(error.response.data.error);
                } else {
                    this.props.errorMessage('Unknown error during registration');
                }
            }
        }
    }

    render() {
        return (
            <div
                className={
                    this.props.shadow
                        ? 'form form-shadow loginForm'
                        : 'form loginForm'
                }
            >
                <form onSubmit={this.handleSubmit}>
                    <legend>Register</legend>
                    <div className="formControl">
                        <input
                            type="text"
                            id="registerUsername"
                            name="registerUsername"
                            placeholder="Username"
                            value={this.props.registerUsername}
                            onChange={(event) => this.props.handleInputEvent(event)}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            ref={input => {
                                this.registerUsernameInput = input;
                            }}
                        />
                    </div>
                    <div className="formControl">
                        <input
                            type="text"
                            id="registerEmail"
                            name="registerEmail"
                            placeholder="E-mail"
                            value={this.props.registerEmail}
                            onChange={(event) => this.props.handleInputEvent(event)}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            ref={input => {
                                this.registerEmailInput = input;
                            }}
                        />
                    </div>
                    <div className="formControl">
                        <input
                            type="text"
                            id="registerRealname"
                            name="registerRealname"
                            placeholder="Real name"
                            value={this.props.registerRealname}
                            onChange={(event) => this.props.handleInputEvent(event)}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            ref={input => {
                                this.registerRealnameInput = input;
                            }}
                        />
                    </div>
                    <div className="formControl">
                        <input
                            type="password"
                            id="registerPassword"
                            name="registerPassword"
                            placeholder="Password"
                            value={this.props.registerPassword}
                            onChange={(event) => this.props.handleInputEvent(event)}
                            className="input fullWidth"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            ref={input => {
                                this.registerPasswordInput = input;
                            }}
                        />
                    </div>
                    <div className="formControl">
                        <input
                            type="password"
                            id="registerPasswordConfirm"
                            name="registerPasswordConfirm"
                            placeholder="Confirm Password"
                            value={this.props.registerPasswordConfirm}
                            onChange={(event) => {
                                this.props.handleInputEvent(event);
                                this.props.checkPasswordsMatch(
                                    this.props.registerPassword, 
                                    event.target.value
                                );
                            }}
                            className="input fullWidth"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            ref={input => {
                                this.registerPasswordConfirmInput = input;
                            }}
                        />
                    </div>
                    <div className="formControl">
                        <SuccessBtn
                            fill
                            loader={this.props.loader}
                            disabled={!this.formValid()}
                            style={{ width: '100%' }}
                        >
                            Register (ENTER)
                        </SuccessBtn>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    handleInputEvent,
    reset,
    focusPasswordField,
    setRegistering,
    focusPasswordConfirmField,
    checkPasswordsMatch,
    successMessage,
    errorMessage,
    loggedIn
};

const mapStateToProps = state => {
    return {
        registerUsername: state.register.registerUsername,
        registerPassword: state.register.registerPassword,
        registerEmail: state.register.registerEmail,
        registerRealname: state.register.registerRealname,
        minPasswordLength: state.register.minPasswordLength,
        minUsernameLength: state.register.minUsernameLength,
        registerStep: state.register.registerStep,
        registerUsernameDisabled: state.register.registerUsernameDisabled,
        registerPasswordDisabled: state.register.registerPasswordDisabled,
        submitDisabled: state.register.submitDisabled,
        loader: state.register.loader,
        registerPasswordConfirmDisabled: state.register.registerPasswordConfirmDisabled,
        passwordsMatch: state.register.passwordsMatch,
        registerPasswordConfirm: state.register.registerPasswordConfirm
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);