import { 
    setRegistering,
    submitRegistration
} from '../reducers/registerReducer';

import {
    setLoggingIn,
    setAccessToken
} from '../reducers/userReducer';

import {
    errorMessage
} from '../reducers/notificationReducer';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('axios');

const initialState = require('./initialState');
let mockStore = configureStore([thunk])(initialState);

describe('RegisterReducer', () => {
    beforeEach(() => {
        mockStore = configureStore([thunk])(initialState);
    });

    it('action creators return correct actions', () => {
        expect(setRegistering(true)).toEqual({ type: 'SET_REGISTERING', isRegistering: true });
        expect(setRegistering(false)).toEqual({ type: 'SET_REGISTERING', isRegistering: false });
    });

    it('successful registration dispatches correct actions', () => {
        return mockStore.dispatch(submitRegistration({
            username: 'user',
            realname: 'User',
            email: 'something@example.com',
            password: 'pass'
        })).then(() => {
            const expectedActions = [
                setRegistering(true),
                setLoggingIn(true),
                setRegistering(false),
                setAccessToken('access token')
            ];

            expect(mockStore.getActions()).toEqual(expectedActions);
        });

    });

    it('unsuccessful registration dispatches correct actions', () => {
        return mockStore.dispatch(submitRegistration({
            username: 'duplicate',
            realname: 'User',
            email: 'something@example.com',
            password: 'pass'
        })).then(() => {
            const expectedActions = [
                setRegistering(true),
                {
                    type: 'MESSAGE',
                    messageType: 'ERROR',
                    message: 'error'
                },
                setRegistering(false)
            ];
            
            let actions = mockStore.getActions();
            delete actions[1]['id'];

            expect(actions).toEqual(expectedActions);
        });
    });
});
