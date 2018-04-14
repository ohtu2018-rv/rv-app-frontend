import eanValidator from './../services/eanValidator';
import { errorMessage } from './notificationReducer';
import { deposit } from './userReducer';
import { buyProduct } from './productReducer';

export const initialState = {
    terminalInput: '',
    inputValid: false
};

export const terminalActions = {
    INPUT_EVENT_TERMINAL: 'INPUT_EVENT_TERMINAL',
    SET_INPUT_VALIDITY: 'SET_INPUT_VALIDITY',
    RESET_TERMINAL: 'RESET_TERMINAL'
};

const regex =
    '^d(255(.|,)00|0(.|,)(05|[1-9](0|5))|([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4])(.|,)[0-9](0|5))$';

const parseRegexToCents = value => {
    return parseInt(value[1].replace(',', '').replace('.', ''), 10);
};

const getRegexMatch = value => {
    return value.match(regex);
};

export const handleInputEvent = event => {
    return dispatch => {
        dispatch({
            type: terminalActions.INPUT_EVENT_TERMINAL,
            value: event.target.value
        });
        const inputValid =
            getRegexMatch(event.target.value) ||
            eanValidator.validateEan(event.target.value);
        dispatch({
            type: terminalActions.SET_INPUT_VALIDITY,
            inputValid: inputValid
        });
    };
};

export const handleTerminalSubmit = value => {
    return async dispatch => {
        const depositRegexMatch = getRegexMatch(value);
        if (depositRegexMatch) {
            const amount = parseRegexToCents(depositRegexMatch);
            dispatch(deposit(amount));
        } else if (eanValidator.validateEan(value)) {
            dispatch(buyProduct(value, 1));
        } else {
            // Invalid EAN / command
            dispatch(errorMessage('Invalid command'));
        }
        dispatch({
            type: terminalActions.RESET_TERMINAL
        });
    };
};

/**
 * Terminal reducer.
 * @param {object} state
 * @param {object} action
 */
const terminalReducer = (state = initialState, action) => {
    switch (action.type) {
    case terminalActions.INPUT_EVENT_TERMINAL:
        return Object.assign({}, state, { terminalInput: action.value });
    case terminalActions.SET_INPUT_VALIDITY:
        return Object.assign({}, state, { inputValid: action.inputValid });
    case terminalActions.RESET_TERMINAL:
        return Object.assign({}, initialState);
    default:
        return state;
    }
};

export default terminalReducer;
