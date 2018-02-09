const initialState = {
    isLoggingIn: false,
    loggedIn: false,
    access_token: '',
    error: ''
};

/**
 * Login sequence.
 * @param {object} user
 */
export const login = (user) => {
    return async dispatch => {   
        verifyLogin(user).then(
            res => dispatch(setLoggedState(res.access_token))
        )
    }
};

export const logout = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
};

export const setLoggingIn = () => {
    console.log("is logging in")
    return {
        type: 'LOGGING_IN'
    }
};

function setLoggedState(token) {
    console.log("not logging in")
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
    return fetch('https://rv-backend.herokuapp.com/api/v1/user/authenticate', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            username: user.username,
            password: user.password
        })
    }).then(res => res.json())
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
            return Object.assign({}, state, { loggedIn: true, access_token: action.token, isLoggingIn: false });
        case 'LOGIN_FAILED':
            return Object.assign({}, state, { loggedIn: false, access_token: '', isLoggingIn: false });
        case 'LOGOUT_SUCCESS':
            return Object.assign({}, { loggedIn: false, access_token: '' });
        default:
            return state;
    }
};

export default authenticationReducer;
