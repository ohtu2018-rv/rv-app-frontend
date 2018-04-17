export const depositActions = {
    TOGGLE_CONFIRMATION_VISIBILITY: 'TOGGLE_CONFIRMATION_VISIBILITY',
    SET_AMOUNT: 'SET_AMOUNT',
    RESET_DEPOSIT: 'RESET_DEPOSIT',
    INCREASE_AMOUNT: 'INCREASE_AMOUNT'
};

export const initialState = {
    confirmationVisibility: false,
    depositAmount: 0
};

export const toggleConfirmationVisibility = value => {
    return {
        type: depositActions.TOGGLE_CONFIRMATION_VISIBILITY,
        value: !value
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

export const increaseAmount = value => {
    return {
        type: depositActions.INCREASE_AMOUNT,
        value
    };
};

const depositReducer = (state = initialState, action) => {
    switch (action.type) {
    case depositActions.TOGGLE_CONFIRMATION_VISIBILITY:
        return Object.assign({}, state, {
            confirmationVisibility: action.value
        });
    case depositActions.RESET_DEPOSIT:
        return Object.assign({}, state, {
            depositAmount: 0
        });
    case depositActions.SET_AMOUNT:
        return Object.assign({}, state, {
            depositAmount: action.value
        });
    case depositActions.INCREASE_AMOUNT:
        return Object.assign({}, state, {
            depositAmount: state.depositAmount + action.value
        });
    default:
        return state;
    }
};

export default depositReducer;
