import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { rootReducer } from '../app/redux';

export const configureStore = (initialState = {}) => {
  const isDev = process.env.NODE_ENV === 'development';
  const isBrowser = typeof window !== 'undefined';

  if (isDev && isBrowser && window.store) {
    return window.store;
  }

  const devTools =
    isDev && isBrowser && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : compose;

  const middleware = applyMiddleware(thunkMiddleware);

  const createStoreWithMiddleware = compose(
    middleware,
    devTools
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (isDev && isBrowser) {
    window.store = store;
    return window.store;
  }

  return store;
};
