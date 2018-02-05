import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import './animations.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Import reducers
import testReducer from './reducers/testReducer';
import notificationReducer from './reducers/notificationReducer';

// Combine reducers
const reducer = combineReducers({
    test: testReducer,
    notification: notificationReducer
});

// Create store
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

// Log initial state
console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
