import { get } from 'lodash';
import axios from 'axios';

export const byId = items =>
  (items || []).reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

export const handleError = ({ dispatch, action }) => error => {
  console.log('error', error);
  dispatch({
    type: action,
    payload: {
      error: get(error, 'response.data', 'Sorry, something went wrong'),
    },
  });
};

export const INITIAL_STATE = {
  items: [],
  itemsById: {},
  error: false,
  loading: false,
};

// TYPES
export const CHECKOUT = 'CHECKOUT';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

export const UPDATE_CART = 'UPDATE_CART';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const UPDATE_CART_FAILURE = 'UPDATE_CART_FAILURE';

// REDUCER
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHECKOUT:
    case UPDATE_CART:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CHECKOUT_SUCCESS:
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
        itemsById: byId(action.payload.items),
        loading: false,
        error: false,
      };
    case CHECKOUT_FAILURE:
    case UPDATE_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
        itemsById: byId(state.items),
      };
  }
};

export const checkout = payload => dispatch => {
  dispatch({
    type: CHECKOUT,
  });

  return axios({
    method: 'post',
    url: `/api/checkout`,
    data: payload,
  })
    .then(({ data }) => {
      dispatch({
        type: CHECKOUT_SUCCESS,
        payload: data,
      });
    })
    .catch(handleError({ dispatch, action: CHECKOUT_FAILURE }));
};

export const updateCart = ({ productId, quantity }) => dispatch => {
  dispatch({
    type: UPDATE_CART,
  });

  return axios({
    method: 'put',
    url: `/api/cart`,
    data: {
      productId,
      quantity,
    },
  })
    .then(({ data }) => {
      dispatch({
        type: UPDATE_CART_SUCCESS,
        payload: data.cart,
      });
    })
    .catch(handleError({ dispatch, action: UPDATE_CART_FAILURE }));
};
