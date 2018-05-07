export const initialState = {
    registerVisible: false,
    registerUsername: '',
    registerPassword: '',
    registerEmail: '',
    registerRealname: '',
    registerPasswordConfirm: '',
    minUsernameLength: 4,
    minPasswordLength: 4,
    registerUsernameDisabled: false,
    registerPasswordDisabled: true,
    registerEmailDisabled: true,
    registerRealnameDisabled: true,
    submitDisabled: false,
    loader: false,
    registerStep: 1,
    registerPasswordConfirmDisabled: true,
    passwordsMatch: false
};

export const registerActions = {
    TOGGLE_REGISTER_VISIBILITY: 'TOGGLE_REGISTER_VISIBILITY',
    RESET_REGISTER: 'RESET_REGISTER',
    INPUT_EVENT_REGISTER: 'INPUT_EVENT_REGISTER',
    REGISTERING: 'REGISTERING',
    FOCUS_PASSWORD_FIELD_REGISTER: 'FOCUS_PASSWORD_FIELD_REGISTER',
    FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER: 'FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER',
    MARK_PASSWORD_MATCH: 'MARK_PASSWORD_MATCH',
    FOCUS_EMAIL_FIELD: 'FOCUS_EMAIL_FIELD',
    FOCUS_REALNAME_FIELD: 'FOCUS_REALNAME_FIELD'
};

export const toggleRegisterVisibility = () => {
    return {
        type: registerActions.TOGGLE_REGISTER_VISIBILITY
    };
};

export const checkPasswordsMatch = (password, confirmPassword) => {
    return {
        type: registerActions.MARK_PASSWORD_MATCH,
        passwordsMatch: (password === confirmPassword)
    };
};

export const reset = () => {
    return {
        type: registerActions.RESET_REGISTER
    };
};

export const handleInputEvent = event => {
    return {
        type: registerActions.INPUT_EVENT_REGISTER,
        target: event.target.name,
        value: event.target.value
    };
};

export const setRegistering = event => {
    return {
        type: registerActions.REGISTERING,
        registerUsernameDisabled: true,
        registerPasswordDisabled: true,
        loader: true
    };
};

export const focusEmailField = () => {
    return {
        type: registerActions.FOCUS_EMAIL_FIELD,
        registerStep: 2,
        registerUsernameDisabled: true
    };
};

export const focusRealnameField = () => {
    return {
        type: registerActions.FOCUS_REALNAME_FIELD,
        registerStep: 3,
        registerUsernameDisabled: true,
        registerEmailDisabled: true,
        registerPasswordDisabled: true
    };
};

export const focusPasswordField = () => {
    return {
        type: registerActions.FOCUS_PASSWORD_FIELD_REGISTER,
        registerStep: 4,
        registerUsernameDisabled: true,
        registerEmailDisabled: true,
        registerRealnameDisabled: true,
        registerRealnamedDisabled: true
    };
};

export const focusPasswordConfirmField = () => {
    return {
        type: registerActions.FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER,
        registerStep: 5,
        registerUsernameDisabled: true,
        registerPasswordDisabled: true,
        registerPasswordConfirmDisabled: false,
        submitDisabled: false
    };
};


/**
 * Registration reducer.
 * @param {object} state
 * @param {object} action
 */
const registerReducer = (state = initialState, action) => {
    switch (action.type) {
    case registerActions.TOGGLE_REGISTER_VISIBILITY:
        return Object.assign({}, state, {
            registerVisible: !state.registerVisible
        });
    case registerActions.RESET_REGISTER:
        return Object.assign({}, initialState);
    case registerActions.INPUT_EVENT_REGISTER:
        return Object.assign({}, state, { [action.target]: action.value });
    case registerActions.FOCUS_PASSWORD_FIELD_REGISTER:
        return Object.assign({}, state, {
            registerStep: action.registerStep,
            registerUsernameDisabled: action.registerUsernameDisabled,
            registerPasswordDisabled: action.registerPasswordDisabled,
            submitDisabled: action.submitDisabled
        });
    case registerActions.FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER:
        return Object.assign({}, state, {
            registerStep: action.registerStep,
            registerUsernameDisabled: action.registerUsernameDisabled,
            registerPasswordDisabled: action.registerPasswordDisabled,
            registerPasswordConfirmDisabled: action.registerConfirmPasswordDisabled,
            submitDisabled: action.submitDisabled
        });
    case registerActions.REGISTERING:
        return Object.assign({}, state, {
            registerUsernameDisabled: true,
            registerPasswordDisabled: true,
            loader: true
        });
    case registerActions.MARK_PASSWORD_MATCH:
        return Object.assign({}, state, {
            passwordsMatch: action.passwordsMatch
        });
    case registerActions.FOCUS_EMAIL_FIELD:
    case registerActions.FOCUS_REALNAME_FIELD:
        return Object.assign({}, state, {
            ...state,
            action
        });
    default:
        return state;
    }
};

export default registerReducer;
