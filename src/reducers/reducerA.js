const initialState = {
  userData: {},
  isFetching: false,
  errorMessage: null
};

const reducerA = (state = initialState, action) => {
  console.log("action type => ", action.type)
  switch (action.type) {
    case "FETCHED_USER_DATA":
      return Object.assign({}, state, {
        userData: action.data,
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
