const axios = require('axios');

export const USER_INTIAL_STATE = {};

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const reducer = (state = USER_INTIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOGOUT_SUCCESS: {
      return USER_INTIAL_STATE;
    }
    default:
      return state;
  }
};

export const login = ({ email, password }) => dispatch => {
  dispatch({
    type: LOGIN,
  });
  console.log('dispatch');
  return axios({
    method: 'post',
    url: '/api/users/login',
    data: {
      email,
      password,
    },
  })
    .then(response => {
      const { data } = response;

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    })
    .catch(e => {
      console.log('axios error', e);
      dispatch({
        type: LOGIN_FAILURE,
      });
    });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });

  return axios({
    method: 'post',
    url: '/api/users/logout',
  })
    .then(() => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch(e => {
      console.log('axios error', e);
      dispatch({
        type: LOGOUT_FAILURE,
      });
    });
};

export const addToCart = ({ productId }) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
  });

  return axios({
    method: 'put',
    url: `/api/users/cart`,
    data: {
      productId,
      userId: getState().user.id,
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
    url: `/api/users/cart`,
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
