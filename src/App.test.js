import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from 'redux-mock-store';
import initialState from './_tests_/initialState';
import { Provider } from 'react-redux';

describe('<App/>', () => {
    const mockStore = configureStore();
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
