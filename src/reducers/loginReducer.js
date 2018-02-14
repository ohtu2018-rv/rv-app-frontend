export const initialState = {
    username: '',
    password: '',
    minUsernameLength: 8,
    minPasswordLength: 2,
    usernameDisabled: false,
    passwordDisabled: true,
    submitDisabled: true,
    loginStep: 1
};

export const reset = () => {
    return {
        type: 'RESET'
    };
};

export const handleInputEvent = event => {
    return {
        type: 'INPUT_EVENT',
        target: event.target.name,
        value: event.target.value
    };
};

export const focusPasswordField = () => {
    return {
        type: 'FOCUS_PASSWORD_FIELD',
        loginStep: 2,
        usernameDisabled: true,
        passwordDisabled: false,
        submitDisabled: false
    };
};

export const focusUsernameField = () => {
    return {
        type: 'FOCUS_USERNAME_FIELD',
        loginStep: 1,
        usernameDisabled: false,
        passwordDisabled: true,
        submitDisabled: true
    };
};

/**
 * Login reducer.
 * @param {object} state
 * @param {object} action
 */
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'RESET':
        return Object.assign({}, initialState);
    case 'INPUT_EVENT':
        return Object.assign({}, state, { [action.target]: action.value });
    case 'FOCUS_PASSWORD_FIELD':
        return Object.assign({}, state, {
            loginStep: action.loginStep,
            usernameDisabled: action.usernameDisabled,
            passwordDisabled: action.passwordDisabled,
            submitDisabled: action.submitDisabled
        });
    case 'FOCUS_USERNAME_FIELD':
        return Object.assign({}, state, {
            loginStep: action.loginStep,
            usernameDisabled: action.usernameDisabled,
            passwordDisabled: action.passwordDisabled,
            submitDisabled: action.submitDisabled
        });
    case 'CLEAR_FORM':
        return Object.assign({}, state, {
            username: '',
            password: ''
        });
    default:
        return state;
    }
};

export default loginReducer;
