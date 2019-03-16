import { WEB3_CONNECTED, FETCHED_TOKEN_BALANCE, RECEIVED_ERROR, SET_LOADING, FETCHED_ETH_BALANCE } from "../actions/types";

const initialState = {
  isWeb3Connected: false,
  tokenBalance: null,
  ethBalance: null,
  isLoading: false,
  errorMessage: null,
  selectedAddress: null,
  networkName: null,
};

const reducerWeb3 = (state = initialState, action) => {
  switch (action.type) {
    case WEB3_CONNECTED:
      return Object.assign({}, state, {
        selectedAddress: action.payload.selectedAddress,
        networkName: action.payload.networkName,
        errorMessage: null
      });
    case FETCHED_TOKEN_BALANCE:
      return Object.assign({}, state, {
        tokenBalance: action.payload,
        isLoading: false,
        errorMessage: null
      });
    case FETCHED_ETH_BALANCE:
      return Object.assign({}, state, {
        ethBalance: action.payload,
        isLoading: false,
        errorMessage: null
      });
    case RECEIVED_ERROR:
      return Object.assign({}, state, {
        tokenBalance: null,
        isLoading: false,
        errorMessage: action.payload
      });
    case SET_LOADING:
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
