const axios = require('axios');

export const CART_INITIAL_STATE = {
  items: [],
};

export const UPDATE_CART = 'UPDATE_CART';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const UPDATE_CART_FAILURE = 'UPDATE_CART_FAILURE';

export const CHECKOUT = 'CHECKOUT';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

export const reducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CART_SUCCESS: {
      return {
        ...state,
        ...action.payload.cart,
      };
    }
    default:
      return state;
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
    .then(response => {
      console.log('checkout response', response);
      const { data } = response;

      dispatch({
        type: CHECKOUT_SUCCESS,
        payload: data,
      });
    })
    .catch(e => {
      console.log('axios error', e);
      dispatch({
        type: CHECKOUT_FAILURE,
      });
    });
};

export const updateCart = ({ productId, number }) => dispatch => {
  dispatch({
    type: UPDATE_CART,
  });

  return axios({
    method: 'put',
    url: `/api/cart`,
    data: {
      productId,
      number,
    },
  })
    .then(response => {
      console.log('axios responst', response);
      const { data } = response;

      dispatch({
        type: UPDATE_CART_SUCCESS,
        payload: data,
      });
    })
    .catch(e => {
      console.log('axios error', e);
      dispatch({
        type: UPDATE_CART_FAILURE,
      });
    });
};
