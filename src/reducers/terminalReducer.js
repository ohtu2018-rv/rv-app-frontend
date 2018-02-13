export const initialState = {
    terminalInput: '',
    inputValid: false
};

const regex = '^d(255,00|0,(05|[1-9](0|5))|([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4]),[0-9](0|5))$';

const parseRegexToCents = (value) => {
    return parseInt(value[1].replace(',',''));
};

const getRegexMatch = (value) => {
    return value.match(regex);
};

const validateInput = (value) => {
    // Implement this when regex is expanded to accept EAN
    return 'a';
};

export const handleInputEvent = (event) => {
    return dispatch => {
        dispatch({
            type: 'INPUT_EVENT_TERMINAL',
            value: event.target.value
        });
        const inputValid = !!getRegexMatch(event.target.value);
        dispatch({
            type: 'SET_INPUT_VALIDITY',
            inputValid: inputValid
        });
    };
};

export const handleTerminalSubmit = (value, deposit) => {
    /**implement regex here
     * 
     */
    return dispatch => {
        const regexMatch = getRegexMatch(value);
        if (regexMatch) {
            const product = { price: parseRegexToCents(regexMatch) };
            deposit(product);
            dispatch({ 
                type: 'RESET_TERMINAL'
            });
        }
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
    case 'SET_INPUT_VALIDITY':
        return Object.assign({}, state, { inputValid: action.inputValid });
    case 'RESET_TERMINAL':
        return Object.assign( {}, initialState);     
    default:
        return state;
    }
};

export default terminalReducer;
