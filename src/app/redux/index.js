import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { reducer as productsReducer } from './products/reducer';
import { reducer as userReducer } from './user/reducer';

export const rootReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
});

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
