import productService from '../services/productService';

export const productActions = {
    SET_GETTING_PRODUCTS: 'GETTING_PRODUCTS',
    SET_PRODUCTS: 'SET_PRODUCTS'
};

export const initialState = {
    products: [],
    gettingProducts: false
};

export const getProducts = () => {
    return async dispatch => {
        try {
            dispatch({ type: productActions.SET_GETTING_PRODUCTS });
            const products = await productService.getAllProducts();
            dispatch({
                type: productActions.SET_PRODUCTS,
                products
            });
        } catch (err) {
            console.error(err);
        }
    };
};

/**
* Product reducer.
* @param {object} state
* @param {object} action
*/
const productReducer = (state = initialState, action) => {
    switch (action.type) {
    case productActions.SET_GETTING_PRODUCTS:
        return Object.assign({}, state, {
            gettingProducts: true,
        });
    case productActions.SET_PRODUCTS:
        return Object.assign({}, state, {
            products: action.products,
            gettingProducts: false
        });
    default:
        return state;
    }
};

export default productReducer;
