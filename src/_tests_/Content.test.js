import React from 'react';
import ReactDOM from 'react-dom';
import Content from '../components/sections/Content';
import configureStore from 'redux-mock-store';
import initialState from './initialState.js';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

describe('Content component', () => {
    const mockStore = configureStore();
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        mount(
            <Provider store={store}>
                <Content deposit={() => {}} />
            </Provider>
        );
    });
});
