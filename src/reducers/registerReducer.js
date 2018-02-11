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

export const toggleRegisterVisibility = () => {
    return {
        type: 'TOGGLE_REGISTER_VISIBILITY'
    }
}

export const reset = () => {
    return {
        type: 'RESET_REGISTER'
    }
}

export const handleInputEvent = (event) => {
    return {
        type: 'INPUT_EVENT_REGISTER',
        target: event.target.name,
        value: event.target.value
    }
}

export const setRegistering = (event) => {
    return {
        type: 'REGISTERING',
        registerUsernameDisabled: true,
        registerPasswordDisabled: true,
        loader: true
    }
}

export const focusPasswordField = () => {
    return {
        type: 'FOCUS_PASSWORD_FIELD_REGISTER',
        registerStep: 2, 
        registerUsernameDisabled: true,
        registerPasswordDisabled: false,
        submitDisabled: false
    }
}

/**
 * Registeration reducer.
 * @param {object} state
 * @param {object} action
 */
const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_REGISTER_VISIBILITY':
            return Object.assign({}, state, { registerVisible: !state.registerVisible });
        case 'RESET_REGISTER':
            return Object.assign({}, initialState);
        case 'INPUT_EVENT_REGISTER':
            return Object.assign({}, state, { [action.target]: action.value });
        case 'FOCUS_PASSWORD_FIELD_REGISTER':
            return Object.assign({}, state, 
                { 
                    registerStep: action.registerStep, 
                    registerUsernameDisabled: action.registerUsernameDisabled,
                    registerPasswordDisabled: action.registerPasswordDisabled,
                    submitDisabled: action.submitDisabled
                });
        case 'REGISTERING':
            return Object.assign({}, state, 
                { 
                    registerUsernameDisabled: true,
                    registerPasswordDisabled: true,
                    loader: true
                });
        default:
            return state;
    }
};

export default registerReducer;
