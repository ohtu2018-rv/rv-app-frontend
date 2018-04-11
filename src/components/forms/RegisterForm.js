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
            return;
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
                            placeholder="Käyttäjätunnus"
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
                            placeholder="Sähköpostiosoite"
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
                            placeholder="Oikea nimi"
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
                            placeholder="Salasana"
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
                            placeholder="Salasana uudelleen"
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
                            Rekisteröidy (ENTER)
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
    errorMessage
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