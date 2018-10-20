import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

import Loading from './Loading';
import ProductCarousel from './ProductCarousel';
import { fetchProduct } from '../redux/products/reducer';

class _ProductInfo extends Component {
  componentDidMount() {
    const {
      dispatchFetchProduct,
      productsMap,
      match: {
        params: { productId },
      },
    } = this.props;
    if (!productsMap[productId]) {
      console.log('fetch');
      dispatchFetchProduct(productId);
    }
  }

  render() {
    const {
      loading,
      productsMap,
      match: {
        params: { productId },
      },
    } = this.props;
    const product = productsMap[productId];
    if (loading) {
      return <Loading message="Fetching your product" />;
    }
    if (!product) return null;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <img src={product.images[0]} />
          </div>
          <div className="col-xs-12 col-sm-6">
            <h1>{product.name}</h1>
            <h6>{`$${product.price}`}</h6>
            <h5>{product.shortDescription}</h5>
            <button type="button" className="btn btn-primary">
              Add To Cart
            </button>
          </div>
          <div className="col-xs-12">
            {product.longDescription.map(desc => (
              <p key={v4()}>{desc}</p>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    );
  }
}

const mapStateToProps = ({ products: { loading, productsMap } }) => ({
  loading,
  productsMap,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchProduct: fetchProduct(dispatch),
});

const ProductInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProductInfo);

export default ProductInfo;
