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


    // web3.eth.getBalance(address, function (error, wei) {
    //   if (!error) {
    //     var balance = window.web3.fromWei(wei, 'ether');
    //     dispatch({
    //       type: FETCHED_ETH_BALANCE,
    //       payload: balance + " Tokens",
    //     });
    //   } else {
    //     return dispatch({
    //       type: RECEIVED_ERROR,
    //       payload: error.toString(),
    //     });
    //   }
    // });

  }
}


// import contract from 'adhi-contract'

// import web3 from '../utils/web3'
// import AuctionFactoryArtifact from '../../contractbuild/AuctionFactory.json'
// import AuctionArtifact from '../../contractbuild/Auction.json'
// import {
//   WEB3_CONNECTED,
//   WEB3_ERROR,
//   WEB3_ACCOUNT_CHANGE
// } from './types'
// import {
//   getAuctionscount
// } from './auctionActions'

// export const web3Connect = () => async (dispatch, getState) => {
//   try {
//     // contract ABI and set provider
//     const auctionFactoryContract = contract(AuctionFactoryArtifact)
//     auctionFactoryContract.setProvider(web3.currentProvider)

//     // const imageRegisterContract = contract(ImageRegisterContractArtifact)
//     // imageRegisterContract.setProvider(web3.currentProvider)

//     // deployed contract
//     const contractInstance = await auctionFactoryContract.deployed()
//     const auctionContract = contract(AuctionArtifact)
//     auctionContract.setProvider(web3.currentProvider)
//     // start watching the contract events
//     contractInstance
//       .AuctionCreated({
//         fromBlock: 0,
//         toBlock: 'latest'
//       })
//       .watch((error, result) => {
//         if (error) {
//           console.log('Auction created event ERR', error)
//           dispatch({
//             type: WEB3_ERROR,
//             payload: {
//               loading: false,
//               error,
//             },
//           })
//         } else {
//           console.log('Auction created event', result)
//           dispatch(getAuctionscount())
//         }
//       })


//     web3.currentProvider.publicConfigStore.on(
//       'update',
//       async ({
//         selectedAddress
//       }) => {
//         console.log('publicConfigStore:update event', selectedAddress)
//         if (selectedAddress) {
//           const lcSelectedAddress = selectedAddress.toLowerCase()
//           if (lcSelectedAddress !== getState().web3.account) {
//             await dispatch({
//               type: WEB3_ACCOUNT_CHANGE,
//               payload: lcSelectedAddress,
//             })
//             dispatch(getAuctionscount())
//           }
//         }
//       }
//     )

//     // get the first account and ensure we are connected
//     const accounts = await getAccount()
//     const account = accounts[0]
//     console.log('auth info', web3, contractInstance, account)
//     if (account) {
//       // we are connected
//       dispatch({
//         type: WEB3_CONNECTED,
//         payload: {
//           web3,
//           contractInstance,
//           auctionContract,
//           account: account.toLowerCase(),
//           loading: false,
//         },
//       })
//     } else {
//       // something is wrong
//       const error = `Unable to get the list of accounts that control the node. Verify that MetaMask is connected to the proper network then reload the application.`
//       console.log(error)
//       dispatch({
//         type: WEB3_ERROR,
//         payload: {
//           loading: false,
//           error,
//         },
//       })
//     }
//   } catch (error) {
//     // unable to load the contract
//     console.log('err', error)
//     const errorMessage = `Error loading 'ImageRegister' contract. Be sure MetaMask is connected to a network and the contract is deployed. ERR: ${
//       error.message
//     }`
//     console.log(errorMessage)
//     dispatch({
//       type: WEB3_ERROR,
//       payload: {
//         loading: false,
//         error: errorMessage,
//       },
//     })
//   }
// }

// const getAccount = () => {
//   let promise = new Promise((resolve, reject) => {
//     web3.adh.getAccounts((err, res) => {
//       if (!err) {
//         resolve(res)
//       } else {
//         reject('Cannot get accounts')
//       }
//     })
//   })
//   return promise
// }
