const initialState = {
    registerVisible: false,
    username: '',
    password: '',
    minUsernameLength: 8,
    minPasswordLength: 2,
    usernameDisabled: false,
    passwordDisabled: true,
    submitDisabled: true,
    loader: false,
    registerStep: 1
};

export const toggleRegisterVisibility = () => {
    return {
        type: 'TOGGLE_REGISTER_VISIBILITY'
    }
}

export const reset = () => {
    return {
        type: 'RESET'
    }
}

export const handleInputEvent = (event) => {
    return {
        type: 'INPUT_EVENT',
        target: event.target.name,
        value: event.target.value
    }
}

export const setRegistering = (event) => {
    return {
        type: 'REGISTERING',
        usernameDisabled: true,
        passwordDisabled: true,
        loader: true
    }
}

/*
export const handleKeyPress = event => {
    switch (event.keyCode) {
        case 13:
            event.preventDefault();
            nextStep();
            break;
        case 9:
            event.preventDefault();
            nextStep();
            break;
        default:
            break;
    }
};
*/

export const focusPasswordField = () => {
    return {
        type: 'FOCUS_PASSWORD_FIELD',
        registerStep: 2, 
        usernameDisabled: true,
        passwordDisabled: false,
        submitDisabled: false
    }
}
/*
const nextStep = async () => {
    if (this.state.registerStep === 1) {
        return {
            type: 'FOCUS_PASSWORD_FIELD',
            registerStep: 2, 
            usernameDisabled: true,
            passwordDisabled: false,
            submitDisabled: false
        }
        this.passwordInput.focus();
    } else if (this.state.registerStep === 2) {
        this.setState({
            usernameDisabled: true,
            passwordDisabled: true,
            loader: true
        });
        this.props.setLoggingIn();
        await wait(1000);

        // Do login
        // Replace timeout with something smarter
        timeout = setTimeout(() => {
            this.setState({
                registerStep: 1,
                usernameDisabled: false,
                passwordDisabled: true,
                submitDisabled: true,
                username: '',
                password: '',
                loader: false
            });
            this.usernameInput.focus();
        }, 1500);

        this.props.authenticate({
            username: this.state.username,
            password: this.state.password
        });
    }
};
/*
const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));
*/
/**
 * Registeration reducer.
 * @param {object} state
 * @param {object} action
 */
const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_REGISTER_VISIBILITY':
            return Object.assign({}, state, { registerVisible: !state.registerVisible });
        case 'RESET':
            return Object.assign({}, initialState);
        case 'INPUT_EVENT':
            return Object.assign({}, state, { [action.target]: action.value });
        case 'FOCUS_PASSWORD_FIELD':
            return Object.assign({}, state, 
                { 
                    registerStep: action.registerStep, 
                    usernameDisabled: action.usernameDisabled,
                    passwordDisabled: action.passwordDisabled,
                    submitDisabled: action.submitDisabled
                });
        case 'REGISTERING':
            return Object.assign({}, state, 
                { 
                    usernameDisabled: true,
                    passwordDisabled: true,
                    loader: true
                });
        default:
            return state;
    }
};

export default registerReducer;
