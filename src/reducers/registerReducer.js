export const initialState = {
    registerVisible: false,
    registerUsername: '',
    registerPassword: '',
    minUsernameLength: 8,
    minPasswordLength: 2,
    registerUsernameDisabled: false,
    registerPasswordDisabled: true,
    submitDisabled: true,
    loader: false,
    registerStep: 1
};

export const registerActions = {
    TOGGLE_REGISTER_VISIBILITY: 'TOGGLE_REGISTER_VISIBILITY',
    RESET_REGISTER: 'RESET_REGISTER',
    INPUT_EVENT_REGISTER: 'INPUT_EVENT_REGISTER',
    REGISTERING: 'REGISTERING',
    FOCUS_PASSWORD_FIELD_REGISTER: 'FOCUS_PASSWORD_FIELD_REGISTER'
};

export const toggleRegisterVisibility = () => {
    return {
        type: registerActions.TOGGLE_REGISTER_VISIBILITY
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

export const focusPasswordField = () => {
    return {
        type: registerActions.FOCUS_PASSWORD_FIELD_REGISTER,
        registerStep: 2,
        registerUsernameDisabled: true,
        registerPasswordDisabled: false,
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
    case registerActions.REGISTERING:
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
