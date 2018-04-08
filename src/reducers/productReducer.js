import productService from '../services/productService';

export const productActions = {
    SET_GETTING_PRODUCTS: 'GETTING_PRODUCTS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_FILTERED_PRODUCTS: 'SET_FILTERED_PRODUCTS'
};

export const initialState = {
    products: [],
    filteredProducts: [],
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

export const filterProducts = (searchString, products) => {
    const filteredProducts = products.filter(product => 
        product.product_name.trim().toLowerCase().includes(searchString.trim().toLowerCase())
    );
    return {
        type: productActions.SET_FILTERED_PRODUCTS,
        filteredProducts
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
    case productActions.SET_FILTERED_PRODUCTS:
        return Object.assign({}, state, {
            filteredProducts: action.filteredProducts
        });
    default:
        return state;
    }
};

export default productReducer;
