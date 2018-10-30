import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { reducer as applicationReducer } from './application/reducer';
import { reducer as productsReducer } from './products/reducer';
import { reducer as userReducer } from './user/reducer';
import { reducer as cartReducer } from './cart/reducer';

export const rootReducer = combineReducers({
  application: applicationReducer,
  cart: cartReducer,
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
