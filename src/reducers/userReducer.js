import userService from '../services/userService';
import { 
    successMessage,
    errorMessage 
} from '../reducers/notificationReducer';

export const initialState = {
    profile: {
        username: null,
        full_name: null,
        email: null,
        acount_balance: null
    },
    isLoggingIn: false,
    loggedIn: false,
    accessToken: null
};

export const userActions = {
    RESET_USER_DATA: 'RESET_USER_DATA',
    SET_USER_DATA: 'SET_USER_DATA',
    INCREASE_BALANCE: 'INCREASE_BALANCE',
    DECREASE_BALANCE: 'DECREASE_BALANCE',
    SET_BALANCE: 'SET_BALANCE',
    LOGOUT: 'LOGOUT',
    LOGGING_IN: 'LOGGING_IN',
    LOGGED_IN: 'LOGGED_IN',
    SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN'
};

export const setUserProfile = profile => {
    return {
        type: userActions.SET_USER_DATA,
        profile
    };
};

export const increaseBalance = balance => {
    return {
        type: userActions.INCREASE_BALANCE,
        balance
    };
};

export const decreaseBalance = balance => {
    return {
        type: userActions.DECREASE_BALANCE,
        balance
    };
};

export const setBalance = balance => {
    return {
        type: userActions.SET_BALANCE,
        balance
    };
};

export const logout = () => {
    return {
        type: userActions.LOGOUT
    };
};

export const setLoggingIn = loggingIn => {
    return {
        type: userActions.LOGGING_IN,
        loggingIn
    };
};

export const setLoggedIn = loggedIn => {
    return {
        type: userActions.LOGGED_IN,
        loggedIn
    };
};

export const setAccessToken = token => {
    return {
        type: userActions.SET_ACCESS_TOKEN,
        token
    };
};

export const login = (username, password) => {
    return async dispatch => {
        dispatch(setLoggingIn(true));

        try {
            const auth = await userService.authenticate({
                username, password
            });
            dispatch(setAccessToken(auth.data.access_token));
            const user = await userService.getUser(auth.data.access_token);
            dispatch(setUserProfile(user));
            dispatch(setLoggedIn(true));
        } catch (err) {
            if (err.response) {
                dispatch(errorMessage(err.response.data.message));
            } else {
                dispatch(errorMessage('Tuntematon virhe kirjautumisessa'));
            }
        } finally {
            dispatch(setLoggingIn(false));
        }
    };
};

export const deposit = amount => async (dispatch, getState) => {
    const token = getState().user.accessToken;

    try {
        await userService.increaseBalance(token, amount);
        dispatch(increaseBalance(amount));
        dispatch(successMessage(
            'Talletettu RV-tilille ' +
                parseFloat(amount / 100).toFixed(2) +
                ' €'
        ));
    } catch (err) {
        if (err.response) {
            dispatch(errorMessage(err.response.data.message));
        } else {
            dispatch(errorMessage('Tuntematon virhe saldon lisäämisessä'));
        }
    }
};

/**
 * User reducer.
 * @param {object} state
 * @param {object} action
 */
const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case userActions.SET_USER_DATA:
        return Object.assign({}, state, {
            profile: action.profile
        });
    case userActions.LOGOUT:
        return Object.assign({}, state, initialState);
    case userActions.INCREASE_BALANCE:
        return Object.assign({}, state, {
            profile: {
                ...state.profile,
                account_balance: state.profile.account_balance + action.balance
            }
        });
    case userActions.DECREASE_BALANCE:
        return Object.assign({}, state, {
            profile: {
                ...state.profile,
                account_balance: state.profile.account_balance - action.balance
            }
        });
    case userActions.SET_BALANCE:
        return Object.assign({}, state, {
            profile: {
                ...state.profile,
                account_balance: action.balance
            }
        });
    case userActions.LOGGING_IN:
        return Object.assign({}, state, {
            isLoggingIn: action.loggingIn
        });
    case userActions.LOGGED_IN:
        return Object.assign({}, state, {
            loggedIn: action.loggedIn
        });
    case userActions.SET_ACCESS_TOKEN:
        return Object.assign({}, state, {
            accessToken: action.token
        });
    default:
        return state;
    }
};

export default userReducer;
