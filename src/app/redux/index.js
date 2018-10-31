import { combineReducers } from 'redux';

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
