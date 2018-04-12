import { initialState as notificationState } from '../reducers/notificationReducer';
import { initialState as registerState } from '../reducers/registerReducer';
import { initialState as terminalState } from '../reducers/terminalReducer';
import { initialState as userState } from '../reducers/userReducer';

const state = {
    notification: notificationState,
    register: registerState,
    terminal: terminalState,
    user: userState
};

export default state;
