import { createStore } from "redux";

const initialState = {
  drawnFeatures: [],
  userEmail: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DRAWNFEATURES":
      return {
        ...state,
        drawnFeatures: action.payload
      };
    case "EMAIL":
      return {
        ...state,
        userEmail: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        loggedOut: action.payload
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
