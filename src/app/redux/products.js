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

export const INTIAL_STATE = {
  productsList: [],
  productsById: {},
  productsByCategory: {},
  loading: false,
  error: false,
};

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        productsById: {
          ...state.productsById,
          [action.payload._id]: action.payload,
        },
      };
    case FETCH_PRODUCT_FAILURE:
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
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
    .then(({ data }) => {
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: {
          productsList: data,
          productsById: data.reduce(
            (acc, product) => ({
              ...acc,
              [product._id]: product,
            }),
            {}
          ),
          productsByCategory: data.reduce(
            (acc, product) => ({
              ...acc,
              [product.category]: acc[product.category]
                ? acc[product.category].concat(product)
                : [product],
            }),
            {}
          ),
        },
      });
    })
    .catch(handleError({ dispatch, action: FETCH_PRODUCTS_FAILURE }));
};

export const fetchProduct = dispatch => productId => {
  dispatch({
    type: FETCH_PRODUCT,
  });

  return axios({
    method: 'get',
    url: `/api/products/${productId}`,
  })
    .then(({ data }) => {
      dispatch({
        type: FETCH_PRODUCT_SUCCESS,
        payload: data,
      });
    })
    .catch(handleError({ dispatch, action: FETCH_PRODUCT_FAILURE }));
};
