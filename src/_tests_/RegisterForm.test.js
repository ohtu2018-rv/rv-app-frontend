import React from 'react';
import ReactDOM from 'react-dom';
import { RegisterForm } from '../components/forms/RegisterForm';
import configureStore from 'redux-mock-store';
import initialState from './initialState.js';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

describe('RegisterForm component', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        mount(<RegisterForm/>);
    });
    
});