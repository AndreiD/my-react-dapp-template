import React from 'react';
import { connect } from "react-redux";
import * as actionCreator from '../actions/web3Actions'
import { Formik, Form, Field } from 'formik'
import BalanceCard from './layout/BalanceCard';
import M from 'materialize-css'
import Preloader from './layout/Preloader'
import Error from './layout/Error'

import AccountNetworkCard from './info/AccountNetworkCard';

class Home extends React.Component {

  async componentDidMount() {
    M.AutoInit();
    this.props.initWeb3();
  }

  render() {

    return (
      <div className="container">
        <div className="row">

          <AccountNetworkCard selectedAddress={this.props.selectedAddress} networkName={this.props.networkName} />
          <div className="col m6 offset-m3 s12">
            <Formik
              initialValues={{ eth_address: '0x772707e8cEe9FBAB1ce4274130D0e6BaC8Fa872f' }}
              onSubmit={values => {
                this.props.getBalances(values.eth_address)
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
            <BalanceCard tokenBalance={this.props.tokenBalance} ethBalance={this.props.ethBalance} />
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
    errorMessage: state.reducerWeb3.errorMessage,
    ethBalance: state.reducerWeb3.ethBalance
  };
};

const mapDispachToProps = dispatch => {
  return {
    getBalances: (ethAddress) => dispatch(actionCreator.getBalances(ethAddress)),
    initWeb3: () => dispatch(actionCreator.web3Connect())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Home);
