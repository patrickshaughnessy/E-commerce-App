import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from './shared';
import Root from '../app/Root';

require('jquery/dist/jquery.slim.min');
require('bootstrap/dist/js/bootstrap.bundle.min');

const runApp = () => {
  const data = JSON.parse(
    document.getElementById('react-init-props').innerText
  );

  const store = configureStore(data);

  const Application = (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Root />
      </BrowserRouter>
    </Provider>
  );

  const mountNode = document.getElementById('root');
  ReactDOM.hydrate(Application, mountNode);
};

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', runApp);
} else {
  runApp();
}
