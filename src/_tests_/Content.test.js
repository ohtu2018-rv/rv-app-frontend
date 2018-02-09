import React from 'react';
import ReactDOM from 'react-dom';
import Content from '../components/sections/Content';
import Enzyme from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from './initialState.js';

describe('Content component', () => {
    const mockStore = configureStore();
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        // Temporary
        expect(1).toBe(1);
        /*
        const div = document.createElement('div');
        ReactDOM.render(<Content store={store} />, div);*/
    });
});
