import Web3 from "web3";
import getWeb3 from '../utils/getWeb3'
import {
  WEB3_CONNECTED,
  RECEIVED_ERROR,
  SET_LOADING,
  FETCHED_TOKEN_BALANCE,
  FETCHED_ETH_BALANCE
} from './types'
import getNetworkName from "../utils/other";
import { MIN_ABI } from "../components/contract/abi";
import { CONTRACT_ADDRESS } from "../components/contract/constants";



export const web3Connect = () => async (dispatch) => {
  try {
    const web3 = await getWeb3();
    web3.currentProvider.publicConfigStore.on(
      'update',
      ({
        networkVersion,
        selectedAddress
      }) => {
        return dispatch({
          type: WEB3_CONNECTED,
          payload: {
            "selectedAddress": selectedAddress,
            "networkName": getNetworkName(networkVersion),
          },
        })
      }
    )
  } catch (error) {
    console.log('err', error)
    return dispatch({
      type: RECEIVED_ERROR,
      payload: "unable to connect to metamask",
    });
  }
}

// Getting ETH Balance and some smart contract functions like "balanceOf"
// for the tokens balance

export const getBalances = (address) => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });

    const web3 = new Web3(window.web3.currentProvider);
    if (!web3.utils.isAddress(address)) {
      return dispatch({
        type: RECEIVED_ERROR,
        payload: "Invalid ETH address",
      });
    }

    // Get the ETH balance
    web3.eth.getBalance(address, function (error, wei) {
      if (!error) {
        var balance = window.web3.fromWei(wei, 'ether');
        dispatch({
          type: FETCHED_ETH_BALANCE,
          payload: balance + " ETH",
        });
      } else {
        return dispatch({
          type: RECEIVED_ERROR,
          payload: error.toString(),
        });
      }
    });

    // Get ERC20 Token contract instance
    let contract = new web3.eth.Contract(MIN_ABI, CONTRACT_ADDRESS);
    contract.methods.balanceOf(address).call()
      .then(function (result) {
        let balance = result.balance / 1E18; // 18 decimals is the standard
        dispatch({
          type: FETCHED_TOKEN_BALANCE,
          payload: balance + " Tokens",
        });

      });
  }
}
