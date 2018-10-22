const axios = require('axios');

export const USER_INTIAL_STATE = {};

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const reducer = (state = USER_INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
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
    type: FETCH_USER,
  });

  return axios({
    method: 'get',
    url: `/api/users/session`,
  })
    .then(response => {
      console.log('axios response session', response);
      const { data } = response;

      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: data,
      });
    })
    .catch(e => {
      console.log('axios error', e);
      dispatch({
        type: FETCH_USER_FAILURE,
      });
    });
};
