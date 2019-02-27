import React, { Component } from 'react';
import Web3 from 'web3'
import UnlockMetamask from './metamask/UnlockMetamask'
import InstallMetamask from './metamask/InstallMetamask'
import AccountNetworkCard from './info/AccountNetworkCard'
import Contract from './contract/Contract'
import { connect } from 'react-redux'
import { loadTokenAmount } from '../actions/blockchainActions'


let web3 = window.web3;

class Home extends Component {
  constructor() {
    super();
    this.isWeb3Installed = true; //If metamask is installed
    this.isWeb3Locked = false; //If metamask account is locked

    this.state = {
      networkName: 'Checking...',
      account: null,  //address of the currently unlocked metamask
    }

    if (typeof web3 !== 'undefined') {
      this.web3Provider = web3.currentProvider;
      this.web3 = new Web3(web3.currentProvider);

    } else {
      this.isWeb3Installed = false;
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
    this.props.loadTokenBalance(selectedAddress);
  }


  render() {
    // if metamask needs to be installed
    if (!this.isWeb3Installed) {
      return (
        <InstallMetamask />
      )
    }

    // if metamask is locked
    if (this.isWeb3Locked) {
      return (
        <UnlockMetamask message="Please Unlock Your Metamask/Mist Wallet" />
      )
    }

    return (
      <div className="section">
        <AccountNetworkCard account={this.state.account} networkName={this.state.networkName} />
        <Contract tokenAmount={this.props.tokenAmount} />
      </div>

    )

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tokenAmount: state.tokenAmount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTokenBalance: (account) => { dispatch(loadTokenAmount(account)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
