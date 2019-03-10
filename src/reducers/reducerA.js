const initialState = {
  ethData: {},
  isFetching: false,
  errorMessage: null
};

const reducerA = (state = initialState, action) => {
  console.log("action type => ", action.type)
  switch (action.type) {
    case "FETCHED_ETH_DATA":
      return Object.assign({}, state, {
        ethData: action.data,
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


export default reducerA;
