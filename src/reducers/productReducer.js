import productService from '../services/productService';

export const productActions = {
    SET_GETTING_PRODUCTS: 'GETTING_PRODUCTS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_FILTERED_PRODUCTS: 'SET_FILTERED_PRODUCTS',
    SET_GETTING_CATEGORIES: 'GETTING_CATEGORIES',
    SET_CATEGORIES: 'SET_CATEGORIES',
    SET_PRODUCTS_IN_CATEGORY: 'SET_PRODUCTS_IN_CATEGORY'
};

export const initialState = {
    products: [],
    filteredProducts: [],
    gettingProducts: false,
    gettingCategories: false,
    categories: [],
    productsInCategory: []
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

export const getCategories = () => {
    return async dispatch => {
        try {
            dispatch({ type: productActions.SET_GETTING_CATEGORIES });
            const categories = await productService.getAllCategories();
            dispatch({
                type: productActions.SET_CATEGORIES,
                categories
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

export const setProductsInCategory = (category, products) => {
    const productsInCategory = products.filter(product => 
        product.product_group === category.category_id
    );
    return {
        type: productActions.SET_PRODUCTS_IN_CATEGORY,
        productsInCategory
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
    case productActions.SET_GETTING_CATEGORIES:
        return Object.assign({}, state, {
            gettingCategories: true,
        });
    case productActions.SET_PRODUCTS:
        return Object.assign({}, state, {
            products: action.products,
            gettingProducts: false
        });
    case productActions.SET_CATEGORIES:
        return Object.assign({}, state, {
            categories: action.categories,
            gettingCategories: false
        });
    case productActions.SET_FILTERED_PRODUCTS:
        return Object.assign({}, state, {
            filteredProducts: action.filteredProducts
        });
    case productActions.SET_PRODUCTS_IN_CATEGORY:
        return Object.assign({}, state, {
            productsInCategory: action.productsInCategory
        });
    default:
        return state;
    }
};

export default productReducer;
