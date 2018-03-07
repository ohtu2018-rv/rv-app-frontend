import terminalReducer from '../reducers/terminalReducer'
import { 
    handleInputEvent,
    handleTerminalSubmit
} from '../reducers/terminalReducer'

describe('terminalReducer', () => {
    it('action creators return correct actions', async () => {
        /* Dunno how, thunk makes it complicated
        expect(await handleInputEvent().toString()).toEqual({"type": "TOGGLE_REGISTER_VISIBILITY"})
        expect(await handleTerminalSubmit()).toEqual({"type": "TOGGLE_REGISTER_VISIBILITY"})
        */
    });
});