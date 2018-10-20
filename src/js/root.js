import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from '../app/redux';
import App from '../app/components/App';

require('bootstrap/dist/js/bootstrap.bundle.min.js');

const store = configureStore();

const mountNode = document.getElementById('root');

const Application = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Application, mountNode);
