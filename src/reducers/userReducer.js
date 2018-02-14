export const initialState = {
    username: '',
    full_name: '',
    email: '',
    account_balance: 0
};

export const resetUserData = () => {
    return {
        type: 'RESET_USER_DATA'
    };
};

export const setUserData = user => {
    return {
        type: 'SET_USER_DATA',
        user
    };
};

export const increaseBalance = balance => {
    return {
        type: 'INCREASE_BALANCE',
        balance
    };
};

export const decreaseBalance = balance => {
    return {
        type: 'DECREASE_BALANCE',
        balance
    };
};

/**
 * User reducer.
 * @param {object} state
 * @param {object} action
 */
const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SET_USER_DATA':
        return Object.assign({}, state, {
            ...action.user
        });
    case 'RESET_USER_DATA':
        return Object.assign({}, state, initialState);
    case 'INCREASE_BALANCE':
        return Object.assign({}, state, {
            account_balance: state.account_balance + action.balance
        });
    case 'DECREASE_BALANCE':
        return Object.assign({}, state, {
            account_balance: state.account_balance - action.balance
        });
    default:
        return state;
    }
};

export default userReducer;
