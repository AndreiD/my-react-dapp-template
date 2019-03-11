const initialState = {
  tokenBalance: null,
  isFetching: false,
  errorMessage: null
};

const reducerWeb3 = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_TOKEN_BALANCE":
      return Object.assign({}, state, {
        tokenBalance: action.data,
        isFetching: false,
        errorMessage: null
      });
    case "RECEIVED_ERROR":
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.data
      });
    default:
      return state;
  }
};


export default reducerWeb3;
