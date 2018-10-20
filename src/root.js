import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './redux';
import App from './components/App';

const store = configureStore();

const mountNode = document.getElementById('root');

const Application = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Application, mountNode);
