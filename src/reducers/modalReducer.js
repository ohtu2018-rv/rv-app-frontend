export const modalActions = {
    TOGGLE_VISIBILITY: 'TOGGLE_VISIBILITY'   
};

export const initialState = {
    modalVisibility: false
};

export const toggleVisibility = value => {
    let view = value ? false : true;
    return {
        type: modalActions.TOGGLE_VISIBILITY,
        value: view
    };
};


const modalReducer = (state = initialState, action) => {
    switch (action.type) {
    case modalActions.TOGGLE_VISIBILITY:
        return Object.assign({}, state, {
            modalVisibility: action.value
        });
    default:
        return state;
    }
};

export default modalReducer;
