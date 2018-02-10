import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import './animations.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from './reducers/middleware';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Import reducers
import notificationReducer from './reducers/notificationReducer';
import authenticationReducer from './reducers/authenticationReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';

// Combine reducers
const reducer = combineReducers({
    notification: notificationReducer,
    authentication: authenticationReducer,
    shoppingCart: shoppingCartReducer
});

const middleware =
    process.env.NODE_ENV !== 'production'
        ? [require('redux-immutable-state-invariant').default(), thunk, logger]
        : [thunk];

// Create store
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
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
