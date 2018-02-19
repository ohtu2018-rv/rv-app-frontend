export const initialState = {
    registerVisible: false,
    registerUsername: '',
    registerPassword: '',
    registerPasswordConfirm: '',
    minUsernameLength: 4,
    minPasswordLength: 4,
    registerUsernameDisabled: false,
    registerPasswordDisabled: true,
    submitDisabled: true,
    loader: false,
    registerStep: 1,
    registerPasswordConfirmDisabled: true,
    passwordsMatch: false
};

export const toggleRegisterVisibility = () => {
    return {
        type: 'TOGGLE_REGISTER_VISIBILITY'
    };
};

export const checkPasswordsMatch = (password, confirmPassword) => {
    console.log(password, confirmPassword);
    return {
        type: 'MARK_PASSWORD_MATCH',
        passwordsMatch: (password === confirmPassword)
    };
};

export const reset = () => {
    return {
        type: 'RESET_REGISTER'
    };
};

export const handleInputEvent = event => {
    return {
        type: 'INPUT_EVENT_REGISTER',
        target: event.target.name,
        value: event.target.value
    };
};

export const setRegistering = event => {
    return {
        type: 'REGISTERING',
        registerUsernameDisabled: true,
        registerPasswordDisabled: true,
        loader: true
    };
};

export const focusPasswordField = () => {
    return {
        type: 'FOCUS_PASSWORD_FIELD_REGISTER',
        registerStep: 2,
        registerUsernameDisabled: true,
        registerPasswordDisabled: false,
        submitDisabled: true
    };
};

export const focusPasswordConfirmField = () => {
    return {
        type: 'FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER',
        registerStep: 3,
        registerUsernameDisabled: true,
        registerPasswordDisabled: true,
        registerPasswordConfirmDisabled: false,
        submitDisabled: false
    };
};

/**
 * Registeration reducer.
 * @param {object} state
 * @param {object} action
 */
const registerReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'TOGGLE_REGISTER_VISIBILITY':
        return Object.assign({}, state, {
            registerVisible: !state.registerVisible
        });
    case 'RESET_REGISTER':
        return Object.assign({}, initialState);
    case 'INPUT_EVENT_REGISTER':
        return Object.assign({}, state, { [action.target]: action.value });
    case 'MARK_PASSWORD_MATCH':
        return Object.assign({}, state, { passwordsMatch: action.passwordsMatch });
    case 'FOCUS_PASSWORD_FIELD_REGISTER':
        return Object.assign({}, state, {
            registerStep: action.registerStep,
            registerUsernameDisabled: action.registerUsernameDisabled,
            registerPasswordDisabled: action.registerPasswordDisabled,
            submitDisabled: action.submitDisabled
        });
    case 'FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER':
        return Object.assign({}, state, {
            registerStep: action.registerStep,
            registerUsernameDisabled: action.registerUsernameDisabled,
            registerPasswordDisabled: action.registerPasswordDisabled,
            registerPasswordConfirmDisabled: action.registerPasswordConfirmDisabled,
            submitDisabled: action.submitDisabled
        });
    case 'REGISTERING':
        return Object.assign({}, state, {
            registerUsernameDisabled: true,
            registerPasswordDisabled: true,
            loader: true
        });
    default:
        return state;
    }
};

export default registerReducer;
