/*
    Initial state of the application for mocking React Redux
*/
import { initialState as notification } from './../reducers/notificationReducer';
import { initialState as authentication } from './../reducers/authenticationReducer';
import { initialState as login } from './../reducers/loginReducer';
import { initialState as register } from './../reducers/registerReducer';
import { initialState as shoppingCart } from './../reducers/shoppingCartReducer';
import { initialState as modal } from '../reducers/modalReducer';

const initialState = {
    notification,
    shoppingCart,
    authentication,
    login,
    modal,
    register
};

export default initialState;
