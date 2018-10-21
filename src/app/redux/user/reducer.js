const axios = require('axios');

export const USER_INTIAL_STATE = {};

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const FETCH_SESSION = 'FETCH_SESSION';
export const FETCH_SESSION_SUCCESS = 'FETCH_SESSION_SUCCESS';
export const FETCH_SESSION_FAILURE = 'FETCH_SESSION_FAILURE';

export const reducer = (state = USER_INTIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const addToCart = dispatch => ({ productId, userId }) => {
  dispatch({
    type: ADD_TO_CART,
  });

  return axios({
    method: 'put',
    url: `/api/users/addToCart`,
    data: {
      productId,
      userId,
    },
  })
    .then(response => {
      console.log('axios responst', response);
      const { data } = response;

      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: data,
      });
    })
    .catch(e => {
      console.log('axios error', e);
      dispatch({
        type: ADD_TO_CART_FAILURE,
      });
    });
};

export const fetchUser = dispatch => () => {
  dispatch({
    type: FETCH_SESSION,
  });

  return axios({
    method: 'get',
    url: `/api/users/session`,
  })
    .then(response => {
      console.log('axios response session', response);
      const { data } = response;

      // dispatch({
      //   type: FETCH_SESSION_SUCCESS,
      //   payload: data,
      // });
    })
    .catch(e => {
      console.log('axios error', e);
      dispatch({
        type: FETCH_SESSION_FAILURE,
      });
    });
};
