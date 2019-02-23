import React, { Component } from 'react';
import Web3 from 'web3'
import UnlockMetamask from './metamask/UnlockMetamask'
import InstallMetamask from './metamask/InstallMetamask'

let web3 = window.web3;

class Home extends Component {
  constructor() {
    super();
    this.isWeb3 = true; //If metamask is installed
    this.isWeb3Locked = false; //If metamask account is locked

    this.state = {
      networkName: 'Checking...',
      account: null,  //address of the currently unlocked metamask
    }



    if (typeof web3 !== 'undefined') {
      this.web3Provider = web3.currentProvider;
      this.web3 = new Web3(web3.currentProvider);

      // this.tokenZendr = TruffleContract(TokenZendR);
      //this.tokenZendr.setProvider(this.web3Provider);

      if (web3.eth.coinbase === null) {
        this.isWeb3Locked = true;
      }

    } else {
      this.isWeb3 = false;
    }

  }

  componentDidMount() {
    this.isWeb3Locked = true;
    web3.currentProvider.publicConfigStore.on('update', this.metamaskUpdateCallback);
  }

  metamaskUpdateCallback = ({ selectedAddress, networkVersion }) => {

    this.isWeb3 = true;
    this.isWeb3Locked = false;

    let networkName, that = this;
    console.log()
    switch (networkVersion) {
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
        networkName = networkVersion;
    }

    that.setState({ networkName: networkName, account: selectedAddress })

  }




  render() {

    if (this.isWeb3) {
      if (this.isWeb3Locked) {
        return (
          <UnlockMetamask message="Please Unlock Your Metamask/Mist Wallet" />
        )
      } else {
        return (
          <div className="row">
            <div className="col s6 offset-s3">
              <div className="card-panel blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Connected to: {this.state.networkName}</span>
                  {this.state.account && <p>Account: {this.state.account}</p>}
                </div>

              </div>
            </div>
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
