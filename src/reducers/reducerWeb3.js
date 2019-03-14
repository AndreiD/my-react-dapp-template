const initialState = {
  tokenBalance: null,
  isLoading: false,
  errorMessage: null
};

const reducerWeb3 = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_TOKEN_BALANCE":
      return Object.assign({}, state, {
        tokenBalance: action.payload,
        isLoading: false,
        errorMessage: null
      });
    case "RECEIVED_ERROR":
      return Object.assign({}, state, {
        tokenBalance: null,
        isLoading: false,
        errorMessage: action.payload
      });
    case "SET_LOADING":
      return Object.assign({}, state, {
        tokenBalance: null,
        isLoading: action.payload,
        errorMessage: null
      });
    default:
      return state;
  }
};


export default reducerWeb3;
