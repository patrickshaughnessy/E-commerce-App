const axios = require('axios');

export const PRODUCTS_INTIAL_STATE = {
  productsList: [],
  productsById: {},
  productsByCategory: {},
};

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const reducer = (state = PRODUCTS_INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
    case FETCH_PRODUCT: {
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
    case FETCH_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        productsById: {
          ...state.productsById,
          [action.payload._id]: action.payload,
        },
      };
    }
    case FETCH_PRODUCT_FAILURE:
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
          productsById: data.reduce((acc, product) => {
            acc[product._id] = product;
            return acc;
          }, {}),
          productsByCategory: data.reduce((acc, product) => {
            acc[product.category] = acc[product.category]
              ? acc[product.category].concat(product)
              : [product];
            return acc;
          }, {}),
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

export const fetchProduct = dispatch => id => {
  dispatch({
    type: FETCH_PRODUCT,
  });

  return axios({
    method: 'get',
    url: `/api/products/${id}`,
  })
    .then(response => {
      console.log('axios responst', response);
      const { data } = response;

      dispatch({
        type: FETCH_PRODUCT_SUCCESS,
        payload: data,
      });
    })
    .catch(e => {
      console.log('axios error', e);
      dispatch({
        type: FETCH_PRODUCT_FAILURE,
      });
    });
};
