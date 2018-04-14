import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/sections/Header';
import configureStore from 'redux-mock-store';
import initialState from './initialState';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

describe('RegisterForm component', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        mount(<Provider store={store}><Header/></Provider>);
    });
    
});