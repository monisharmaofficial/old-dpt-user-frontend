// userReducer.js
const initialState = {
    user: null,
    isLoggedIn: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload, isLoggedIn: true };
      case 'LOGOUT':
        return { ...state, user: null, isLoggedIn: false };
      // Add other cases as needed
      default:
        return state;
    }
  };
  
  export default userReducer;
  