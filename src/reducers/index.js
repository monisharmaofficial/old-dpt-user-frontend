import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import cartReducer from "../components/cart/CartReducer.js";
import userReducer from '../components/common/HeaderReducer.js';
import currencyReducer from '../components/common/CurrencyRedux/currencyReducer.js';
export default combineReducers({
  form: formReducer,
  currency: currencyReducer,
  cart: cartReducer,
  user: userReducer,
});
