const initialState = {
  ethData: {},
  isLoading: false,
  errorMessage: null
};

const reducerA = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_ETH_DATA":
      return Object.assign({}, state, {
        ethData: action.data,
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


export default reducerA;
