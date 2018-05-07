import React from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from '../components/forms/RegisterForm';
import configureStore from 'redux-mock-store';
import initialState from './initialState.js';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

describe('RegisterForm component', () => {
    const mockStore = configureStore();
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <RegisterForm />
                </Router>
            </Provider>,
            div
        );
    });
});
