import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from '../app/redux';
import App from '../app/components/App';

// Required in index.html, but can use either way
// require('bootstrap/dist/js/bootstrap.min');

const store = configureStore();

const mountNode = document.getElementById('root');

const Application = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Application, mountNode);
