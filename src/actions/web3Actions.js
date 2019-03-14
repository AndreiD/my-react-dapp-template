export const received_error = (data) => {
  return {
    type: "RECEIVED_ERROR",
    data
  };
};

export const fetchedBalance = (data) => {
  return {
    type: "FETCHED_TOKEN_BALANCE",
    data
  }
};

export const getEthBalance = (address) => {
  return (dispatch) => {
    if (!address || 0 === address.address) {  // replace with web3.utils.isAddress
      dispatch(received_error("Invalid ETH address"))
      return
    }
    window.web3.eth.getBalance(address, function (error, wei) {
      if (!error) {
        var balance = window.web3.fromWei(wei, 'ether');
        console.log(balance + " ETH");
      }
    });
  }
}



// export function getEthBalance(address) {
//   console.log("Address - ", address)
//   return async dispatch => {
//     try {
//       await getWeb3().then(wee => {
//         console.log('success ', wee)
//       }).catch(error => {
//         console.log('error', error)
//       })

//       dispatch(fetchedBalance("123 ETH"))
//     } catch (error) {
//       dispatch(received_error(error.toString()))
//       throw (error);
//     }
//   };
// };



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
