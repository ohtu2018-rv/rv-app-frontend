/*
    Initial state of the application for mocking React Redux
*/
import { initialState as notification } from './../reducers/notificationReducer';
import { initialState as authentication } from './../reducers/authenticationReducer';
import { initialState as login } from './../reducers/loginReducer';
import { initialState as register } from './../reducers/registerReducer';
import { initialState as shoppingCart } from './../reducers/shoppingCartReducer';

const initialState = {
    notification,
    shoppingCart,
    authentication,
    login,
    register
};

export default initialState;
