import React, { Component } from 'react';
import Web3 from 'web3'
import UnlockMetamask from './metamask/UnlockMetamask'
import InstallMetamask from './metamask/InstallMetamask'
import AccountNetworkCard from './info/AccountNetworkCard'
import Badges from './contract/Badges'
import { connect } from 'react-redux'


let web3 = window.web3;

class Home extends Component {
  constructor() {
    super();
    this.isWeb3 = true; //If metamask is installed
    this.isWeb3Locked = false; //If metamask account is locked


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
    this.props.initMetamask();
    // this.isWeb3Locked = true;
    // web3.currentProvider.publicConfigStore.on('update', this.metamaskUpdateCallback);

  }

  // metamaskUpdateCallback = ({ selectedAddress, networkVersion }) => {

  //   this.isWeb3 = true;
  //   this.isWeb3Locked = false;

  //   let networkName, that = this;
  //   console.log()
  //   switch (networkVersion) {
  //     case "1":
  //       networkName = "Main";
  //       break;
  //     case "2":
  //       networkName = "Morden";
  //       break;
  //     case "3":
  //       networkName = "Ropsten";
  //       break;
  //     case "4":
  //       networkName = "Rinkeby";
  //       break;
  //     case "42":
  //       networkName = "Kovan";
  //       break;
  //     default:
  //       networkName = networkVersion;
  //   }

  //   that.setState({ networkName: networkName, account: selectedAddress })

  // }


  render() {
    // if metamask needs to be installed
    if (!this.isWeb3) {
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
        <AccountNetworkCard account={this.props.account} networkName={this.props.networkName} />
        <Badges badges={this.props.badges} />
      </div>

    )

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    networkName: state.networkName,
    account: state.account,  //address of the currently unlocked metamask
    badges: state.badges
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initMetamask: () => { dispatch({ type: "INIT_METAMASK" }) },
    //funcname(param) = { dispatch({type:"WHAT", other: param})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
