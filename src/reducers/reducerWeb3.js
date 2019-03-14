const initialState = {
  tokenBalance: null,
  isLoading: false,
  errorMessage: null
};

const reducerWeb3 = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_TOKEN_BALANCE":
      return Object.assign({}, state, {
        tokenBalance: action.data,
        isLoading: false,
        errorMessage: null
      });
    case "RECEIVED_ERROR":
      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: action.data
      });
    default:
      return state;
  }
};


export default reducerWeb3;
