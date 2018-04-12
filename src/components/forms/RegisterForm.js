import React from 'react';
import './styles/LoginForm.css';
import SuccessBtn from './../buttons/SuccessBtn';
import { connect } from 'react-redux';
import { submitRegistration } from '../../reducers/registerReducer';
import { withRouter } from 'react-router-dom';

export class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validationErrors = {};

        this.state = {
            formValid: false
        };
    }

    componentDidMount() {
        this.usernameInput.focus();
    }

    validateForm() {
        let username = this.usernameInput.value.trim();
        let email = this.emailInput.value.trim();
        let realname = this.realnameInput.value.trim();
        let password = this.passwordInput.value;
        let passwordConfirm = this.passwordConfirmInput.value;

        this.validationErrors = {};

        if (username && username.length < 4) {
            this.validationErrors['username'] = 'Käyttäjänimen pitää olla vähintään 4 merkkiä pitkä';
        }

        let emailParts = email.split('@');
        if (email && (emailParts.length !== 2 || emailParts[1].length < 1)) {
            this.validationErrors['email'] = 'Anna kelvollinen sähköpostiosoite';
        }

        if (realname.length === 0) {
            this.validationErrors['realname'] = 'Anna nimi';
        }

        if (password.length < 4) {
            this.validationErrors['password'] = 'Salasanan pitää olla vähintään 4 merkkiä pitkä';
        }

        if (password !== passwordConfirm) {
            this.validationErrors['passwordConfirm'] = 'Salasanat eivät täsmää';
        }

        this.setState({
            formValid: Object.keys(this.validationErrors).length === 0
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (this.state.formValid) {
            this.props.submitRegistration({
                username: this.usernameInput.value,
                email: this.emailInput.value,
                realname: this.realnameInput.value,
                password: this.passwordInput.value
            });
        }
    }

    render() {
        if (this.props.isLoggedIn) {
            this.props.history.push('/');
            return;
        }

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
                            id="username"
                            name="username"
                            placeholder="Käyttäjätunnus"
                            onChange={this.validateForm}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            ref={input => this.usernameInput = input}
                        />
                        { this.validationErrors['username'] &&
                            <div className="input-error-message">
                                {this.validationErrors['username']}
                            </div>
                        }
                    </div>
                    <div className="formControl">
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Sähköpostiosoite"
                            onChange={this.validateForm}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            ref={input => this.emailInput = input}
                        />
                        { this.validationErrors['email'] &&
                            <div className="input-error-message">
                                {this.validationErrors['email']}
                            </div>
                        }
                    </div>
                    <div className="formControl">
                        <input
                            type="text"
                            id="realname"
                            name="realname"
                            placeholder="Oikea nimi"
                            onChange={this.validateForm}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            ref={input => this.realnameInput = input}
                        />
                        { this.validationErrors['realname'] &&
                            <div className="input-error-message">
                                {this.validationErrors['realname']}
                            </div>
                        }
                    </div>
                    <div className="formControl">
                        <input
                            type="password"
                            id="registerPassword"
                            name="registerPassword"
                            placeholder="Salasana"
                            onChange={this.validateForm}
                            className="input fullWidth"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            ref={input => this.passwordInput = input}
                        />
                        { this.validationErrors['password'] &&
                            <div className="input-error-message">
                                {this.validationErrors['password']}
                            </div>
                        }
                    </div>
                    <div className="formControl">
                        <input
                            type="password"
                            id="registerPasswordConfirm"
                            name="registerPasswordConfirm"
                            placeholder="Salasana uudelleen"
                            onChange={this.validateForm}
                            className="input fullWidth"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            ref={input => this.passwordConfirmInput = input}
                        />
                        { this.validationErrors['passwordConfirm'] &&
                            <div className="input-error-message">
                                {this.validationErrors['passwordConfirm']}
                            </div>
                        }
                    </div>
                    <div className="formControl">
                        <SuccessBtn
                            fill
                            disabled={!this.state.formValid}
                            style={{ width: '100%' }}
                            loader={this.props.isRegistering}
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
    submitRegistration
};

const mapStateToProps = state => ({
    isRegistering: state.register.isRegistering,
    loggedIn: state.user.loggedIn
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));