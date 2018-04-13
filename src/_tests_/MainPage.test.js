import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from '../components/pages/MainPage';
import configureStore from 'redux-mock-store';
import initialState from './initialState';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { setUserData } from '../reducers/userReducer';
import thunk from 'redux-thunk';

jest.mock('axios');

describe('Main page', () => {
    const mockStore = configureStore([thunk]);
    let store;

    beforeEach(() => {
        initialState.user.loggedIn = true;
        store = mockStore(initialState);
    });

    it('Renders without crashing', () => {
        mount(
            <Provider store={store}>
                <MainPage/>
            </Provider>
        );
    });
});