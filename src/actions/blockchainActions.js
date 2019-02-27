import {
  MIN_ABI
} from '../components/contract/abi';
import {
  CONTRACT_ADDRESS
} from '../components/contract/constants';

export const loadTokenAmount = ({
  account

}) => {
  return (dispatch) => {

    // async
    console.log(">>>> DO ASYNC STUFF HERE!")
    console.log(">>")
    console.log(this.account)


    // var version = web3.version.api;
    // console.log(version); // "0.2.0"

    // let contract = web3.eth.contract(MIN_ABI).at(CONTRACT_ADDRESS);
    // contract.balanceOf(account, (error, balance) => {
    //   // Get decimals
    //   contract.decimals((error, decimals) => {
    //     // calculate a balance
    //     balance = balance.div(10 ** decimals);
    //     console.log("balance is:" + balance.toString());




    //   });
    // });

    dispatch({
      type: "LOAD_TOKEN_AMOUNT",
      balance: "123.1231"
    })

  }
}
