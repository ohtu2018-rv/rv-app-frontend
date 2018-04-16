import { increaseBalance } from './userReducer';

export const depositActions = {
    TOGGLE_VISIBILITY: 'TOGGLE_VISIBILITY',
    SET_AMOUNT: 'SET_AMOUNT',
    RESET_DEPOSIT: 'RESET_DEPOSIT'
};

export const initialState = {
    depositVisibility: false,
    depositAmount: 0
};

export const toggleVisibility = value => {
    return {
        type: depositActions.TOGGLE_VISIBILITY,
        value: value ? false : true
    };
};

export const resetAmount = () => {
    return {
        type: depositActions.RESET_DEPOSIT
    };
};

export const setAmount = value => {
    return {
        type: depositActions.SET_AMOUNT,
        value
    };
};

const depositReducer = (state = initialState, action) => {
    switch (action.type) {
    case depositActions.TOGGLE_VISIBILITY:
        return Object.assign({}, state, {
            depositVisibility: action.value
        });
    case depositActions.RESET_DEPOSIT:
        return Object.assign({}, state, {
            depositAmount: 0
        });
    case depositActions.SET_AMOUNT:
        return Object.assign({}, state, {
            depositAmount: action.value
        });
    default:
        return state;
    }
};

export default depositReducer;
