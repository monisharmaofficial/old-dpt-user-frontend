// store.js

import { createStore, combineReducers } from 'redux';
import currencyReducer from '../common/CurrencyRedux/currencyReducer';

const rootReducer = combineReducers({
    currency: currencyReducer,
    // ... other reducers
});

const store = createStore(rootReducer);

export default store;
