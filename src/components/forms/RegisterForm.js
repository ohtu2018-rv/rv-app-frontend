import React from 'react';
import './styles/LoginForm.css';

import SuccessBtn from './../buttons/SuccessBtn';

import { connect } from 'react-redux';
import { 
    handleInputEvent, 
    reset,
    focusPasswordField,
    setRegistering
} from './../../reducers/registerReducer';

let timeout;

class RegisterForm extends React.Component {
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        document.addEventListener('keypress', this.handleKeyPress);
        this.registerUsernameInput.focus();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
        document.removeEventListener('keypress', this.handleKeyPress);
        clearTimeout(timeout);
        this.props.reset();
    }

    wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

    nextStep = async () => {
        if (this.props.registerStep === 1) {
            this.props.focusPasswordField();
            this.registerPasswordInput.focus();
        } else if (this.props.registerStep === 2) {
            this.props.setRegistering();
            await this.wait(1000);

            // Register
            // Replace timeout with something smarter
            timeout = setTimeout(() => {
                alert("Registered")
                this.props.reset();
            }, 500);

            // TODO: Here registerService call
            // this.props.register()
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
                    <legend>Register</legend>
                    <div className="formControl">
                        <input
                            type="text"
                            id="registerUsername"
                            name="registerUsername"
                            placeholder="Käyttäjätunnus"
                            value={this.props.registerUsername}
                            onChange={(event) => this.props.handleInputEvent(event)}
                            onKeyDown={this.handleKeyUp}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            disabled={this.props.registerUsernameDisabled}
                            ref={input => {
                                this.registerUsernameInput = input;
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
                            onKeyDown={this.handleKeyUp}
                            className="input fullWidth"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            disabled={this.props.registerPasswordDisabled}
                            ref={input => {
                                this.registerPasswordInput = input;
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
                                    this.props.registerPassword.length >
                                        this.props.minPasswordLength
                                )
                            }
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
    setRegistering
};

const mapStateToProps = state => {
    return {
        registerUsername: state.register.registerUsername,
        registerPassword: state.register.registerPassword,
        minPasswordLength: state.register.minPasswordLength,
        registerStep: state.register.registerStep,
        registerUsernameDisabled: state.register.registerUsernameDisabled,
        registerPasswordDisabled: state.register.registerPasswordDisabled,
        submitDisabled: state.register.submitDisabled,
        loader: state.register.loader
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
