import React, { Component, Fragment } from 'react';
import Home from './components/Home'
import { hot } from 'react-hot-loader/root'
import { setConfig } from 'react-hot-loader'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
setConfig({
  ignoreSFC: true, // RHL will be __completely__ disabled for SFC
  pureRender: true, // RHL will not change render method
})

const styles = {
  stickToBottom: {

  },
};

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
        <Footer />
      </Fragment>
    );
  }
}

export default hot(App);
