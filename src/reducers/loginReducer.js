export const initialState = {
    username: '',
    password: '',
    minUsernameLength: 8,
    minPasswordLength: 2,
    usernameDisabled: false,
    passwordDisabled: true,
    submitDisabled: true,
    loader: false,
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

export const setLogging = event => {
    return {
        type: 'LOGGING_IN',
        usernameDisabled: true,
        passwordDisabled: true,
        loader: true
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
    case 'LOGGING_IN':
        return Object.assign({}, state, {
            usernameDisabled: true,
            passwordDisabled: true,
            loader: true
        });
    default:
        return state;
    }
};

export default loginReducer;
