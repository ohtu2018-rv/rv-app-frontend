import uuidv1 from 'node-uuid';

const initialState = {
    notifications: []
};

const getId = () => uuidv1();

/**
 * Fires a success notification.
 * @param {string} message
 * @param {number} duration
 */
export const successMessage = (message, duration = 4000) => {
    const id = getId();
    return async dispatch => {
        dispatch({
            id,
            type: 'MESSAGE',
            messageType: 'SUCCESS',
            message
        });
        await wait(duration);
        dispatch({
            type: 'CLEAR_MESSAGE',
            id
        });
    };
};

/**
 * Fires an error notification.
 * @param {string} message
 * @param {number} duration
 */
export const errorMessage = (message, duration = 4000) => {
    const id = getId();
    return async dispatch => {
        dispatch({
            id,
            type: 'MESSAGE',
            messageType: 'ERROR',
            message
        });
        await wait(duration);
        dispatch({
            type: 'CLEAR_MESSAGE',
            id
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
            return Object.assign({}, state, {
                notifications: [
                    ...state.notifications,
                    {
                        id: action.id,
                        messageType: action.messageType,
                        message: action.message
                    }
                ]
            });
        case 'CLEAR_MESSAGE':
            const newNotifications = state.notifications.filter(
                notification => notification.id !== action.id
            );
            return Object.assign({}, state, {
                notifications: [...newNotifications]
            });
        default:
            return state;
    }
};

export default notificationReducer;
