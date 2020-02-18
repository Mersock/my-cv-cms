import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk);
const store = createStore(reducer, composeEnhancers(middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
