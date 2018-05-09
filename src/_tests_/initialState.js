/*
    Initial state of the application for mocking React Redux
*/
import { initialState as notification } from './../reducers/notificationReducer';
import { initialState as authentication } from './../reducers/authenticationReducer';
import { initialState as login } from './../reducers/loginReducer';
import { initialState as register } from './../reducers/registerReducer';
import { initialState as modal } from '../reducers/modalReducer';
import { formReducer as form } from 'redux-form';

const initialState = {
    notification,
    authentication,
    login,
    modal,
    register,
    form
};

export default initialState;
