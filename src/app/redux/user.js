import { get } from 'lodash';
import axios from 'axios';

export const handleError = ({ dispatch, action }) => error => {
  dispatch({
    type: action,
    payload: {
      error: get(error, 'response.data', 'Sorry, something went wrong'),
    },
  });
};

export const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  isLoggedIn: false,
  loading: false,
  error: false,
};

// TYPES
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

// REDUCER
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
    case CREATE_USER:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LOGIN_SUCCESS:
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        isLoggedIn: true,
      };
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case CREATE_USER_FAILURE:
      return {
        ...INITIAL_STATE,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

// ACTIONS
export const login = ({ email, password }) => dispatch => {
  dispatch({
    type: LOGIN,
  });

  return axios({
    method: 'post',
    url: '/api/users/login',
    data: {
      email,
      password,
    },
  })
    .then(response => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    })
    .catch(handleError({ dispatch, action: LOGIN_FAILURE }));
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
    .catch(handleError({ dispatch, action: LOGOUT_FAILURE }));
};

export const createUser = ({
  email,
  password,
  confirmPassword,
}) => dispatch => {
  dispatch({
    type: CREATE_USER,
  });

  return axios({
    method: 'post',
    url: '/api/users/create',
    data: {
      email,
      password,
      confirmPassword,
    },
  })
    .then(response => {
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch(handleError({ dispatch, action: CREATE_USER_FAILURE }));
};