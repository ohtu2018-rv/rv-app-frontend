import userService from './../services/userService';

import { setUserData } from './../reducers/userReducer';

export const initialState = {
    isLoggingIn: false,
    loggedIn: true,
    access_token: ''
};

export const logout = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    };
};

export const loggingIn = () => {
    return {
        type: 'LOGGING_IN'
    };
};

export const loggedIn = token => {
    return async dispatch => {
        try {
            const userData = await userService.getUser(token);
            dispatch(setUserData(userData));
            dispatch({
                type: 'LOGGED_IN',
                token
            });
        } catch (err) {
            console.error(err);
        }
    };
};

export const loginFailed = () => {
    return {
        type: 'LOGIN_FAILED'
    };
};

/**
 * Authentication reducer.
 * @param {object} state
 * @param {object} action
 */
const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'LOGGING_IN':
        return Object.assign({}, state, { isLoggingIn: true });
    case 'LOGGED_IN':
        return Object.assign({}, state, {
            loggedIn: true,
            access_token: action.token,
            isLoggingIn: false
        });
    case 'LOGIN_FAILED':
        return Object.assign({}, state, {
            loggedIn: false,
            access_token: '',
            isLoggingIn: false
        });
    case 'LOGOUT_SUCCESS':
        return Object.assign({}, state, {
            loggedIn: false,
            access_token: ''
        });
    default:
        return state;
    }
};

export default authenticationReducer;
