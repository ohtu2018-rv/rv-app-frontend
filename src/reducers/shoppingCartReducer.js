/**
 * Shopping cart reducer. This reducer is responsible for adding & removing items from shopping cart, and doing a final transaction (Should transaction functionality be moved to another reducer?)
 */

const initialState = {
    products: []
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
const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_ITEM':
        return state;
    case 'REMOVE_ITEM':
        return state;
    case 'EMPTY_CART':
        return state;
    case 'CHECKOUT':
        return state;
    default:
        return state;
    }
};

export default shoppingCartReducer;
