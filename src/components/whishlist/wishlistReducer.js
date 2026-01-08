// wislistReducer.js
const initialState = {
    wislist: [],
    totalPrice: 0,
  };
  
  const wislistReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_wislist":
        return {
          ...state,
          wislist: [...state.wislist, action.payload],
        };
      case "REMOVE_FROM_wislist":
        const removedItem = state.wislist.find((item) => item.id === action.payload);
        return {
          ...state,
          wislist: state.wislist.filter((item) => item.id !== action.payload),
          totalPrice: state.totalPrice - (removedItem ? removedItem.price : 0),
        };
      default:
        return state;
    }
  };
  
  // Selector function
  export const selectWislist = (state) => state.wislist;
  
  export default wislistReducer;
  