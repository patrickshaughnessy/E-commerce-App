const axios = require('axios');

export const PRODUCTS_INTIAL_STATE = {
  productsList: [],
  productsMap: {},
};

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const reducer = (state = PRODUCTS_INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case FETCH_PRODUCTS_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const fetchProducts = dispatch => () => {
  dispatch({
    type: FETCH_PRODUCTS,
  });

  return axios({
    method: 'get',
    url: '/api/products',
  })
    .then(response => {
      console.log('axios responst', response);
      const { data } = response;

      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: {
          productsList: data,
        },
      });
    })
    .catch(e => {
      console.log('axios error', e);
      dispatch({
        type: FETCH_PRODUCTS_FAILURE,
      });
    });
};
