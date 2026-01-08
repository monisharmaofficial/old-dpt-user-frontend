// popularReducer.js
const initialState = {
    popular: [],
  };
  
  const popularReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_POPULAR':
        return { ...state, popular: action.payload };
      // Handle other cases if needed
      default:
        return state;
    }
  };
  
  export default popularReducer;
  