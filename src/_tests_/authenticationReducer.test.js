import authenticationReducer from '../reducers/authenticationReducer';
import { logout, loggingIn, loggedIn, loginFailed } from '../reducers/authenticationReducer';

describe('authenticationReducer', () => {
    it('logout-action changes state', () => {
        const state = [];
        const action = logout();

        const newState = authenticationReducer(state, action);

        expect(newState.length).toBe(1);
        expect(newState).toContainEqual(action.data);
    });
});