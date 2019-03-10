import React from 'react';
import { connect } from "react-redux";
import * as actionCreator from '../actions/fetchAction'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'material-ui-formik-components'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import getWeb3 from '../utils/getWeb3'

const style = {
  Paper: { padding: 20, margin: 20 }
}


const initialValues = {
  eth_address: ''
}

class Home extends React.Component {

  async componentDidMount() {
    const web3 = await getWeb3();
    console.log('web3 = ', web3)
    web3.currentProvider.publicConfigStore.on('update', this.metamaskUpdateCallback);

  }

  metamaskUpdateCallback = ({ selectedAddress, networkVersion }) => {
    console.log('changed selectedNetwork', networkVersion)
    console.log('changed selectedAddress', selectedAddress)
  }


  render() {
    return (
      <div className="App">
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={4}>
            <Formik
              initialValues={initialValues}
              validateOnBlur={false}
              validateOnChange
              onSubmit={values => {
                this.props.getEthData(values.eth_address)
              }}
              render={props => (
                <Paper style={style.Paper}>
                  <Form noValidate autoComplete='off'>
                    <Field
                      required
                      name='eth_address'
                      label='Eth Address'
                      component={TextField}></Field>
                    <Button variant="contained" color="primary" type='submit'><i className="material-icons">search</i> Get Balance</Button>
                  </Form>
                </Paper>
              )}
            />
            {this.props.isFetching ? <h3>Loading...</h3> : null}
            {this.props.errorMessage ? (
              <h3 className="error">{this.props.errorMessage}</h3>
            ) : null}
            {Object.keys(this.props.ethData).length > 0 ? (
              <p>{JSON.stringify(this.props.ethData)}</p>
            ) : null}
          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    ethData: state.reducerA.ethData,
    isFetching: state.reducerA.isFetching,
    errorMessage: state.reducerA.errorMessage
  };
};

const mapDispachToProps = dispatch => {
  return {
    getEthData: (ethAddress) => dispatch(actionCreator.getEthBalance(ethAddress))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Home);
