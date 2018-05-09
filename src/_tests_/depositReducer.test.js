import depositReducer from '../reducers/depositReducer';
import { toggleConfirmationVisibility, setAmount, resetAmount, increaseAmount } from '../reducers/depositReducer';

describe('depositReducer', () => {
    it('toggleConfirmationVisibility-action changes state', () => {
        const state = [];
        const action = toggleConfirmationVisibility();

        const newState = depositReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('setAmount-action changes state', () => {
        const state = [];
        const action = setAmount();

        const newState = depositReducer(state, action);
        
        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('resetAmount-action changes state', () => {
        const state = [];
        const action = resetAmount();

        const newState = depositReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('increaseAmount-action changes state', () => {
        const state = [];
        const action = increaseAmount();

        const newState = depositReducer(state, action);
        
        expect(Object.keys(newState).length).toBeTruthy();
    });
});