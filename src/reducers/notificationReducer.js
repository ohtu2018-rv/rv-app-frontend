import uuidv1 from 'node-uuid';

export const initialState = {
    notifications: [],
    purchasedItems: [],
    purchaseNotificationTimeout: 2500
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
 * Adds an item to the product purchase notification.
 * @param {object} product
 */
export const addProductToNotification = product => {
    return {
        type: 'ADD_PRODUCT_TO_PURCHASE',
        data: product
    };
};

export const clearProductsFromNotification = () => {
    return {
        type: 'CLEAR_ITEMS'
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
        case 'ADD_PRODUCT_TO_PURCHASE':
            // Product
            const product = state.purchasedItems.find(
                product => product.barcode === action.data.barcode
            );

            if (!product) {
                return Object.assign({}, state, {
                    purchasedItems: [...state.purchasedItems, action.data]
                });
            } else {
                // Product exists, increment amount
                let products = Object.assign([], state.purchasedItems);
                products = products.map(product => {
                    if (product.barcode !== action.data.barcode) {
                        return product;
                    } else {
                        return Object.assign({}, product, {
                            quantity: product.quantity + action.data.quantity
                        });
                    }
                });
                return Object.assign({}, state, {
                    purchasedItems: [...products]
                });
            }
        case 'CLEAR_ITEMS':
            return Object.assign({}, state, { purchasedItems: [] });
        default:
            return state;
    }
};

export default notificationReducer;
