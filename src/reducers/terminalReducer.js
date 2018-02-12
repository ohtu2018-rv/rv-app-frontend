export const initialState = {
    terminalInput: ''
};

export const handleInputEvent = (event) => {
    return {
        type: 'INPUT_EVENT_TERMINAL',
        value: event.target.value
    };
};


/**
 * Terminal reducer.
 * @param {object} state
 * @param {object} action
 */
const terminalReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'INPUT_EVENT_TERMINAL':
        return Object.assign({}, state, { terminalInput: action.value });
    
    default:
        return state;
    }
};

export default terminalReducer;
