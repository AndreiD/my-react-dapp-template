import {
  MIN_ABI
} from '../components/contract/abi';
import {
  CONTRACT_ADDRESS
} from '../components/contract/constants';

const initalState = {
  tokenAmount: null
};


const rootReducer = (state = initalState, action) => {
  const newState = {
    ...state
  };
  console.log("reducer: newState =", newState, " action =", action)

  switch (action.type) {
    case "LOAD_TOKEN_AMOUNT":

      var version = action.web3.version.api;
      console.log(version); // "0.2.0"

      let contract = action.web3.eth.contract(MIN_ABI).at(CONTRACT_ADDRESS);
      contract.balanceOf(action.account, (error, balance) => {
        // Get decimals
        contract.decimals((error, decimals) => {
          // calculate a balance
          balance = balance.div(10 ** decimals);
          console.log("balance is:" + balance.toString());
        });
      });

      //need some async love..
      return {
        ...state,
        tokenAmount: "1.23"
      }
    default:
      break;
  }
  return newState;
}


export default rootReducer
