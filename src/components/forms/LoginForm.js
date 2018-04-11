import React from 'react';
import './styles/LoginForm.css';

import SuccessBtn from './../buttons/SuccessBtn';

import { connect } from 'react-redux';
import { errorMessage } from './../../reducers/notificationReducer';
import { Link } from 'react-router-dom';
import { login } from '../../reducers/userReducer';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.state = {
            formValid: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.formValid) {
            this.props.login(
                this.usernameInput.value,
                this.passwordInput.value
            );
        }
    }

    componentDidMount() {
        this.usernameInput.focus();
    }

    validateForm() {
        this.setState({
            formValid: this.usernameInput.value && this.passwordInput.value
        });
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
                    <legend>Log in</legend>
                    <div className="formControl">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Käyttäjätunnus"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            onChange={this.validateForm}
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
                            className="input fullWidth"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            onChange={this.validateForm}
                            ref={input => {
                                this.passwordInput = input;
                            }}
                        />
                    </div>
                    <div className="formControl">
                        <SuccessBtn
                            fill
                            loader={this.props.isLoggingIn}
                            disabled={!this.state.formValid}
                            style={{ width: '100%' }}
                        >
                            Kirjaudu sisään (ENTER)
                        </SuccessBtn>
                    </div>
                </form>
                <div>
                    <Link to="/register">Ei tunnusta? Rekisteröidy!</Link>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    errorMessage,
    login
};

const mapStateToProps = state => {
    return {
        isLoggingIn: state.user.isLoggingIn
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
