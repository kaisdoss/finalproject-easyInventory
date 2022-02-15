
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store, persistor } from './Store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import  './assest/scss/setting/setting.css'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
     <BrowserRouter><App /></BrowserRouter> 
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
