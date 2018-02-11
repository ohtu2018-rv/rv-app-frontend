const axios = require('axios');

export const initialState = {
    isLoggingIn: false,
    loggedIn: false,
    access_token: '',
    error: ''
};

/**
 * Login sequence.
 * @param {object} user
 */
export const login = user => {
    return async dispatch => {
        verifyLogin(user).then(res =>
            dispatch(setLoggedState(res.access_token))
        );
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    };
};

export const setLoggingIn = () => {
    return {
        type: 'LOGGING_IN'
    };
};

function setLoggedState(token) {
    if (token) {
        return {
            type: 'LOGIN_SUCCESS',
            token
        };
    }
    return {
        type: 'LOGIN_FAILED'
    };
}

function verifyLogin(user) {
    return axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/authenticate`, {
            username: user.username,
            password: user.password
        })
        .then(res => res.data);
}

/**
 * Authentication reducer.
 * @param {object} state
 * @param {object} action
 */
const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'LOGGING_IN':
        return Object.assign({}, state, { isLoggingIn: true });
    case 'LOGIN_SUCCESS':
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
        return Object.assign({}, { loggedIn: false, access_token: '' });
    default:
        return state;
    }
};

export default authenticationReducer;
