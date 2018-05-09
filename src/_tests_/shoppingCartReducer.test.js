import shoppingCartReducer from '../reducers/shoppingCartReducer';

describe('shoppingCartReducer', () => {
    it('initial test', () => {
        const state = [];
        const action = [];

        const newState = shoppingCartReducer(state, action);

        expect(true).toBeTruthy();
    });
});