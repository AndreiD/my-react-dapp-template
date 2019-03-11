import React from 'react';
import { connect } from "react-redux";
import * as actionCreator from '../actions/web3Actions'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'material-ui-formik-components'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import getWeb3 from '../utils/getWeb3'
import Typography from '@material-ui/core/Typography';
import BalanceCard from './contract/BalanceCard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const initialValues = {
  eth_address: ''
}

class Home extends React.Component {

  async componentDidMount() {
    const web3 = await getWeb3();
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
                this.props.getTokenBalance(values.eth_address)
              }}
              render={props => (

                <Card style={{ marginTop: "30px" }}>
                  <CardContent>

                    <Typography variant="h6">Get the balance for AndysToken</Typography>
                    <Form noValidate autoComplete='off'>
                      <Field
                        required
                        name='eth_address'
                        label='Eth Address'
                        component={TextField}></Field>
                      <Button variant="contained" color="primary" type='submit'><i className="material-icons">search</i> Get Balance</Button>
                    </Form>

                  </CardContent>
                </Card>
              )}
            />
            {this.props.isFetching ? <h3>Loading...</h3> : null}
            {this.props.errorMessage ? (
              <h3 className="error">{this.props.errorMessage}</h3>
            ) : null}
            <BalanceCard tokenAmount={this.props.tokenBalance} />
          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    tokenBalance: state.reducerWeb3.tokenBalance,
    isFetching: state.reducerWeb3.isFetching,
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
