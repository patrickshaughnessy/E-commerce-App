import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from '../app/redux';
import App from '../app/components/App';

// require('bootstrap/dist/js/bootstrap.min');
// require('react-transition-group/dist/react-transition-group');
// require('react-popper/dist/index.umd.min');
require('reactstrap/dist/reactstrap.min');

const store = configureStore();

const mountNode = document.getElementById('root');

const Application = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Application, mountNode);
