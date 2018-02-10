import React from 'react';
import ReactDOM from 'react-dom';
import Content from '../components/sections/Content';
import configureStore from 'redux-mock-store';
import initialState from './initialState.js';
import { Provider } from 'react-redux';

describe('Content component', () => {
    const mockStore = configureStore();
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <Content />
            </Provider>,
            div
        );
    });
});
