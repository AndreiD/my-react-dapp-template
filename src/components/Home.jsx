import React from 'react';
import { connect } from "react-redux";
import * as actionCreator from '../actions/fetchAction'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'material-ui-formik-components'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const style = {
  Paper: { padding: 20, margin: 20 }
}


const initialValues = {
  username: ''
}

class Home extends React.Component {

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
                this.props.getUserData(values.username)
              }}
              render={props => (
                <Paper style={style.Paper}>
                  <Form noValidate autoComplete='off'>
                    <Field
                      required
                      name='username'
                      label='Username'
                      component={TextField}></Field>
                    <Button variant="contained" color="primary" type='submit'><i className="material-icons">search</i> Submit</Button>
                  </Form>
                </Paper>
              )}
            />
            {this.props.isFetching ? <h3>Loading...</h3> : null}
            {this.props.errorMessage ? (
              <h3 className="error">{this.props.errorMessage}</h3>
            ) : null}
            {Object.keys(this.props.userData).length > 0 ? (
              <p>{JSON.stringify(this.props.userData)}</p>
            ) : null}
          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    userData: state.reducerA.userData,
    isFetching: state.reducerA.isFetching,
    errorMessage: state.reducerA.errorMessage
  };
};

const mapDispachToProps = dispatch => {
  return {
    getUserData: (username) => dispatch(actionCreator.fetchGithubData(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Home);
