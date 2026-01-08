// cartReducer.js
const initialState = {
  cart: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      const removedItem = state.cart.find((item) => item.id === action.payload);
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        totalPrice: state.totalPrice - (removedItem ? removedItem.price : 0),
      };
    default:
      return state;
  }
};

// Selector function
export const selectCart = (state) => state.cart;

export default cartReducer;
