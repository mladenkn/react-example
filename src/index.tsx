import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppRoot } from './view/AppRoot';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from './logic/store';

const rootElement = (
  <Provider store={createStore()}>
    <AppRoot />
  </Provider>
)

ReactDOM.render(rootElement, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); 