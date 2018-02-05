const initialState = {
    error: null,
    success: null
};

/**
 * Fires a success notification.
 * @param {string} message
 * @param {number} duration
 */
export const successMessage = (message, duration = 4000) => {
    return async dispatch => {
        dispatch({
            type: 'MESSAGE',
            status: 'SUCCESS',
            message,
            duration
        });
        await wait(duration);
        dispatch({
            type: 'CLEAR_MESSAGE',
            status: 'SUCCESS'
        });
    };
};

/**
 * Fires an error notification.
 * @param {string} message
 * @param {number} duration
 */
export const errorMessage = (message, duration = 4000) => {
    return async dispatch => {
        dispatch({
            type: 'MESSAGE',
            status: 'ERROR',
            message,
            duration
        });
        await wait(duration);
        dispatch({
            type: 'CLEAR_MESSAGE',
            status: 'ERROR'
        });
    };
};

/**
 * Returns a Promise that resolves when the predefined duration is set.
 * @param {number} duration
 */
const wait = duration =>
    new Promise(resolve => setTimeout(() => resolve(), duration));

/**
 * Notification reducer.
 * @param {object} state
 * @param {object} action
 */
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MESSAGE':
            switch (action.status) {
                case 'ERROR':
                    return Object.assign({}, state, { error: action.message });
                case 'SUCCESS':
                    return Object.assign({}, state, {
                        success: action.message
                    });
                default:
                    return state;
            }
        case 'CLEAR_MESSAGE':
            switch (action.status) {
                case 'ERROR':
                    return Object.assign({}, state, { error: null });
                case 'SUCCESS':
                    return Object.assign({}, state, {
                        success: null
                    });
                default:
                    return state;
            }
        default:
            return state;
    }
};

export default notificationReducer;
