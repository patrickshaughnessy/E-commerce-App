import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { rootReducer } from './reducer';

export const configureStore = (initialState = {}) => {
  const devTools =
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : compose;

  const middleware = applyMiddleware(thunkMiddleware);

  const createStoreWithMiddleware = compose(
    middleware,
    devTools
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
};
