import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  Provider
} from 'react-redux'
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import reducerA from './reducers/reducerA'
import thunk from 'redux-thunk'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import lightBlue from '@material-ui/core/colors/lightBlue';

const rootReducer = combineReducers({
  reducerA
})

const store = createStore(rootReducer, applyMiddleware(thunk));

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 12
  },
  palette: {
    type: 'light',
    primary: {
      50: '#ECECEE',
      100: '#C5C6CB',
      200: '#9EA1A9',
      300: '#7D818C',
      400: '#5C616F',
      500: '#3C4252',
      600: '#353A48',
      700: '#2D323E',
      800: '#262933',
      900: '#1E2129',
      A100: '#C5C6CB',
      A200: '#9EA1A9',
      A400: '#5C616F',
      A700: '#2D323E'
    },
    secondary: {
      light: lightBlue[400],
      main: lightBlue[600],
      dark: lightBlue[700]
    },
    error: red
  },
  status: {
    danger: 'orange'
  },
  spacing: {
    unit: 10
  }
})


ReactDOM.render(<Provider store={store}>
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
</Provider>,
  document.getElementById('root'));


serviceWorker.unregister();
