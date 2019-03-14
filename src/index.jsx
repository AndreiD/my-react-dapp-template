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
import reducerSample from './reducers/reducerSample'
import reducerWeb3 from './reducers/reducerWeb3'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  reducerSample,
  reducerWeb3
})

const store = createStore(rootReducer, applyMiddleware(thunk));



ReactDOM.render(<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root'));


serviceWorker.unregister();
