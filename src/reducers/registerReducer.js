import userService from '../services/userService';
import { login } from './userReducer';
import { errorMessage } from './notificationReducer';

export const initialState = {
    isRegistering: false
};

export const registerActions = {
    SET_REGISTERING: 'SET_REGISTERING'
};

export const setRegistering = registering => ({
    type: registerActions.SET_REGISTERING,
    isRegistering: registering
});


export const submitRegistration = user => {
    return async dispatch => {
        dispatch(setRegistering(true));
        try {
            await userService.registerUser(user);
            dispatch(login(user.username, user.password));
        } catch (err) {
            if (err.response) {
                dispatch(errorMessage(err.response.data.error));
            } else {
                dispatch(errorMessage('Tuntematon virhe rekisteröitymisessä'));
            }
        } finally {
            dispatch(setRegistering(false));
        }
    };
};

/**
 * Registration reducer.
 * @param {object} state
 * @param {object} action
 */
const registerReducer = (state = initialState, action) => {
    switch (action.type) {
    case registerActions.SET_REGISTERING:
        return Object.assign({}, state, {
            isRegistering: action.isRegistering
        });
    default:
        return state;
    }
};

export default registerReducer;
