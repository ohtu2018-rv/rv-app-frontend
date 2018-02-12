/**
 * Shopping cart reducer. This reducer is responsible for adding & removing items from shopping cart, and doing a final transaction (Should transaction functionality be moved to another reducer?)
 */

export const initialState = {
    products: [
        {
            barcode: '0000000000001',
            product_name: 'Kahvi',
            price: 50,
            quantity: 1
        },
        {
            barcode: '0000000000005',
            product_name: 'Myslipatukka',
            price: 80,
            quantity: 2
        }
    ]
};

/**
 * Shopping cart reducer.
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
