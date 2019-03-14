import React from 'react';
import { connect } from "react-redux";
import * as actionCreator from '../actions/web3Actions'
import { Formik, Form, Field } from 'formik'
import getWeb3 from '../utils/getWeb3'
import BalanceCard from './contract/BalanceCard';
import M from 'materialize-css'
import Preloader from './layout/Preloader'
import Error from './layout/Error'


class Home extends React.Component {

  async componentDidMount() {
    M.AutoInit(); // carefull with this one
    const web3 = await getWeb3();
    web3.currentProvider.publicConfigStore.on('update', this.metamaskUpdateCallback);
  }

  metamaskUpdateCallback = ({ selectedAddress, networkVersion }) => {
    console.log('changed selectedNetwork', networkVersion)
    console.log('changed selectedAddress', selectedAddress)
  }


  render() {
    return (
      <div className="container">
        <div className="row">
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
    tokenBalance: state.reducerWeb3.tokenBalance,
    isLoading: state.reducerWeb3.isLoading,
    errorMessage: state.reducerWeb3.errorMessage
  };
};

const mapDispachToProps = dispatch => {
  return {
    getTokenBalance: (ethAddress) => dispatch(actionCreator.getEthBalance(ethAddress))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Home);
