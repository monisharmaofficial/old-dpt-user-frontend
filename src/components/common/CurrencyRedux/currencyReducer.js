// currencyReducer.js

const initialState = {
    selectedCurrency: 'AED', // Set the default currency
};

const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENCY':
            return {
                ...state,
                selectedCurrency: action.payload,
            };
        default:
            return state;
    }
};

export default currencyReducer;
