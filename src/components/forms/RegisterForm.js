import React from 'react';
import './styles/LoginForm.css';
import './styles/RegisterForm.css';
import SuccessBtn from './../buttons/SuccessBtn';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import {
    successMessage,
    errorMessage
} from '../../reducers/notificationReducer';

import { loggedIn } from '../../reducers/authenticationReducer';

import { Field, reduxForm } from 'redux-form';

import validator from 'validator';

const required = value => (value ? undefined : 'Vaadittu kenttä');
const minLength = (field, min) => value =>
    value && value.length < min
        ? `${field} täytyy olla vähintään ${min} merkkiä pitkä`
        : undefined;
const passwordLength = value =>
    value && value.length < 12 ? 'Harkitse vahvempaa salasanaa.' : undefined;
const email = value =>
    value && !validator.isEmail(value)
        ? 'Virheellinen sähköpostiosoite'
        : undefined;

const passwordsMatch = (value, allValues) =>
    value !== allValues.password ? 'Salasanat eivät täsmää' : undefined;

const renderField = ({
    input,
    label,
    type,
    className,
    ref,
    meta: { touched, error, warning },
    ...props
}) => (
    <div>
        <label>{label}</label>
        <div>
            <input
                {...input}
                placeholder={label}
                type={type}
                {...props}
                ref={ref}
                className={className + (touched && error ? ' error-field' : '')}
            />
            {touched &&
                ((error && <span className="error-msg">{error}</span>) ||
                    (warning && (
                        <span className="warning-msg">{warning}</span>
                    )))}
        </div>
    </div>
);

export class RegisterForm extends React.Component {
    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit}
                className={
                    this.props.shadow
                        ? 'form form-shadow loginForm'
                        : 'form loginForm'
                }
            >
                <legend>
                    Rekisteröidy &nbsp;&nbsp;&nbsp;<span
                        style={{ fontSize: 13 }}
                    >
                        Ohje: Vaihda lomakekenttää TAB-näppäimellä
                    </span>
                </legend>
                <div className="formControl">
                    <Field
                        name="username"
                        component={renderField}
                        type="text"
                        id="registerUsername"
                        placeholder="Käyttäjätunnus"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="input fullWidth"
                        ref={input => {
                            this.registerUsernameInput = input;
                        }}
                        validate={[required, minLength('Käyttäjätunnuksen', 4)]}
                    />
                </div>
                <div className="formControl">
                    <Field
                        name="email"
                        component={renderField}
                        type="text"
                        id="registerEmail"
                        placeholder="Sähköpostiosoite"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="input fullWidth"
                        ref={input => {
                            this.registerEmailInput = input;
                        }}
                        validate={[required, email]}
                    />
                </div>
                <div className="formControl">
                    <Field
                        name="realname"
                        component={renderField}
                        type="text"
                        id="registerRealname"
                        placeholder="Etunimi ja sukunimi"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="input fullWidth"
                        ref={input => {
                            this.registerRealnameInput = input;
                        }}
                        validate={[required]}
                    />
                </div>
                <div className="formControl">
                    <Field
                        name="password"
                        component={renderField}
                        type="password"
                        id="registerPassword"
                        placeholder="Salasana"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="input fullWidth"
                        ref={input => {
                            this.registerPasswordInput = input;
                        }}
                        validate={[required, minLength('Salasanan', 4)]}
                        warn={passwordLength}
                    />
                </div>
                <div className="formControl">
                    <Field
                        name="passwordAgain"
                        component={renderField}
                        type="password"
                        id="registerPasswordConfirm"
                        placeholder="Salasana uudelleen"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="input fullWidth"
                        ref={input => {
                            this.registerPasswordConfirmInput = input;
                        }}
                        validate={[required, passwordsMatch]}
                    />
                </div>
                <div className="formControl">
                    <Field
                        name="submit"
                        component={SuccessBtn}
                        fill
                        loader={this.props.loader}
                        disabled={this.props.submitDisabled}
                        style={{ width: '100%' }}
                        type="submit"
                    >
                        Rekisteröidy (ENTER)
                    </Field>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Link to="/" className="backbutton">
                        Palaa takaisin kirjautumiseen
                    </Link>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = {
    successMessage,
    errorMessage,
    loggedIn
};

const mapStateToProps = state => {
    return {
        submitDisabled: state.register.submitDisabled,
        loader: state.register.loader
    };
};

RegisterForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

export default reduxForm({
    // a unique name for the form
    form: 'register'
})(RegisterForm);
