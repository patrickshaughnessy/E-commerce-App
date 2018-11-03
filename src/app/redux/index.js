import { combineReducers } from 'redux';

import applicationReducer from './application';
import productsReducer from './products';
import userReducer from './user';
import cartReducer from './cart';

export const rootReducer = combineReducers({
  application: applicationReducer,
  cart: cartReducer,
  products: productsReducer,
  user: userReducer,
});
