import React from 'react';
import { connect } from "react-redux";
import * as actionCreator from '../actions/web3Actions'
import { Formik, Form, Field } from 'formik'
import BalanceCard from './contract/BalanceCard';
import M from 'materialize-css'
import Preloader from './layout/Preloader'
import Error from './layout/Error'
import AccountNetworkCard from './info/AccountNetworkCard';

class Home extends React.Component {

  async componentDidMount() {
    M.AutoInit();

    const element = document.querySelector('#modal_splash');
    let splashModalInstance = M.Modal.getInstance(element);
    splashModalInstance.open();

    this.props.initWeb3()
  }


  render() {

    return (
      <div className="container">
        <div className="row">
          <div id="modal_splash" className="modal">
            <div className="modal-content">
              <h4>WELCOME TO SUPER DAPP TEMPLATE</h4>
              <p>At the moment we support Metamask. Please note that SUPPER DAPP does not gain access to your ETH or Tokens when you connect your wallet.</p>
              <p>
                MetaMask is a browser extension that allows you to access your wallet quickly, safely & easily. It is more secure because you never enter your private key on a website. It protects you from phishing & malicious websites.</p>
              <p>This is a secure way to access your wallet.  <a target="_blank" rel="noopener noreferrer" href='https://metamask.io/'>OFFICIAL METAMASK WEBSITE</a>
              </p>
            </div>
            <div className="modal-footer">
              <button type="submit" className="modal-close waves-effect waves-green btn-flat">CLOSE</button>
            </div>
          </div>


          <AccountNetworkCard selectedAddress={this.props.selectedAddress} networkName={this.props.networkName} />

          <div className="col m6 offset-m3 s12">
            <Formik
              initialValues={{ eth_address: '' }}
              onSubmit={values => {
                this.props.getTokenBalance(values.eth_address)
              }}
              render={props => (
                <div className="card white" style={{ marginTop: '50px' }}>
                  <div className="card-content">
                    <span className="card-title">Get the balance for AndysToken</span>

                    <Form noValidate autoComplete='off'>
                      <div className="row">
                        <div className="input-field col s12">
                          <label htmlFor="eth_address">ETH Address</label>
                          <Field
                            required
                            id="eth_address"
                            name='eth_address'
                            label='Eth Address'
                            type="text"></Field>
                        </div>
                        <div className="col s12">
                          <p className="right-align"><button className="waves-effect green waves-light btn" type='submit'><i className="material-icons left">search</i> Get Balance</button></p>
                        </div>
                      </div>
                    </Form>

                  </div>
                </div>

              )}
            />
            <BalanceCard tokenBalance={this.props.tokenBalance} />
            <Error errorMessage={this.props.errorMessage} />
            <Preloader show={this.props.isLoading} />
          </div>
        </div>
      </div >
    );
  }
}


const mapStateToProps = state => {
  return {
    selectedAddress: state.reducerWeb3.selectedAddress,
    networkName: state.reducerWeb3.networkName,
    tokenBalance: state.reducerWeb3.tokenBalance,
    isLoading: state.reducerWeb3.isLoading,
    errorMessage: state.reducerWeb3.errorMessage
  };
};

const mapDispachToProps = dispatch => {
  return {
    getTokenBalance: (ethAddress) => dispatch(actionCreator.getEthBalance(ethAddress)),
    initWeb3: () => dispatch(actionCreator.web3Connect())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Home);
