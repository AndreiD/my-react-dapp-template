const initialState = {
  ethData: {},
  isLoading: false,
  errorMessage: null
};

const reducerA = (state = initialState, action) => {
  switch (action.type) {
    case "WHAT":
      return Object.assign({}, state, {
        ethData: action.payload,
        isLoading: false,
        errorMessage: null
      });
    case "RECEIVED_ERROR":
      return Object.assign({}, state, {
        ethData: {},
        isLoading: false,
        errorMessage: action.payload
      });
    default:
      return state;
  }
};


export default reducerA;
