import React, { Component } from 'react';
import Web3 from 'web3'
import UnlockMetamask from './metamask/UnlockMetamask'
import InstallMetamask from './metamask/InstallMetamask'


class Home extends Component {
  constructor() {
    super();

    this.isWeb3 = true; //If metamask is installed
    this.isWeb3Locked = false; //If metamask account is locked

    this.state = {
      network: 'Checking...',
      account: null,  //address of the currently unlocked metamask
    }

    let web3 = window.web3;

    //set web3 & truffle contract
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3Provider = web3.currentProvider;
      this.web3 = new Web3(web3.currentProvider);
      if (web3.eth.coinbase === null) this.isWeb3Locked = true;

    } else {
      this.isWeb3 = false;
    }


  }


  //switch statement to check the current network and set the
  //value to be displayed on the nav component
  setNetwork = () => {
    let networkName = this;

    this.web3.eth.net.getId(function (err, networkId) {
      switch (networkId) {
        case "1":
          networkName = "Main";
          break;
        case "2":
          networkName = "Morden";
          break;
        case "3":
          networkName = "Ropsten";
          break;
        case "4":
          networkName = "Rinkeby";
          break;
        case "42":
          networkName = "Kovan";
          break;
        default:
          networkName = networkId;
      }

      this.setState({
        network: networkName
      })
    });
  };


  componentDidMount() {
    let account = this.web3.eth.coinbase;
    this.setNetwork();
    this.setState({
      account
    });
  }


  render() {
    if (this.isWeb3) {
      if (this.isWeb3Locked) {
        return (
          <div>
            ...
            <UnlockMetamask message="Please Unlock Your Metamask/Mist Wallet" />
          </div>
        )
      } else {
        return (
          <div>
            connected ok! {this.state.network}
          </div>
        )
      }
    } else {
      return (
        <InstallMetamask />
      )
    }
  }




}

export default Home;
