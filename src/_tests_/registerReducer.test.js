import RegisterReducer from '../reducers/registerReducer'
import { 
    toggleRegisterVisibility,
    checkPasswordsMatch,
    reset,
    handleInputEvent,
    setRegistering,
    focusEmailField,
    focusRealnameField,
    focusPasswordField,
    focusPasswordConfirmField
} from '../reducers/registerReducer'

describe('RegisterReducer', () => {
    it('action creators return correct actions', () => {
        expect(toggleRegisterVisibility()).toEqual({"type": "TOGGLE_REGISTER_VISIBILITY"})
        expect(checkPasswordsMatch()).toEqual({"passwordsMatch": true, "type": "MARK_PASSWORD_MATCH"})
        expect(reset()).toEqual({"type": "RESET_REGISTER"})
        expect(handleInputEvent({ target: { value: "e" } })).toEqual({"target": undefined, "type": "INPUT_EVENT_REGISTER", "value": "e"})
        expect(setRegistering()).toEqual({"loader": true, "registerPasswordDisabled": true, "registerUsernameDisabled": true, "type": "REGISTERING"})
        expect(focusEmailField()).toEqual({"registerStep": 2, "registerUsernameDisabled": true, "type": "FOCUS_EMAIL_FIELD"})
        expect(focusRealnameField()).toEqual({"registerEmailDisabled": true, "registerPasswordDisabled": true, "registerStep": 3, "registerUsernameDisabled": true, "type": "FOCUS_REALNAME_FIELD"})
        expect(focusPasswordConfirmField()).toEqual({"registerPasswordConfirmDisabled": false, "registerPasswordDisabled": true, "registerStep": 5, "registerUsernameDisabled": true, "submitDisabled": false, "type": "FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER"})
    });

    it('input is dispatched correctly', () => {
        expect(handleInputEvent({ target: { value: "test" } })).toEqual({"target": undefined, "type": "INPUT_EVENT_REGISTER", "value": "test"})
    });

    describe('Password match', () => {
        it('dispatched false on not equal', () => {
            expect(checkPasswordsMatch("is", "not is")).toEqual({"passwordsMatch": false, "type": "MARK_PASSWORD_MATCH"})
        });
    
        it('dispatched true on equal', () => {
            expect(checkPasswordsMatch("is", "is")).toEqual({"passwordsMatch": true, "type": "MARK_PASSWORD_MATCH"})
        });  
    });
});