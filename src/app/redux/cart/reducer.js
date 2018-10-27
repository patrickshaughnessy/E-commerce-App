const axios = require('axios');

export const USER_INTIAL_STATE = {};

export const UPDATE_CART = 'UPDATE_CART';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const UPDATE_CART_FAILURE = 'UPDATE_CART_FAILURE';

export const reducer = (state = USER_INTIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const updateCart = ({ productId, remove = false }) => dispatch => {
  dispatch({
    type: UPDATE_CART,
  });

  return axios({
    method: 'put',
    url: `/api/cart`,
    data: {
      productId,
      remove,
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
