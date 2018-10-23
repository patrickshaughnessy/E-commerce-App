import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { v4 } from 'uuid';

import Loading from './Loading';
import { fetchProduct } from '../redux/products/reducer';
import { addToCart } from '../redux/user/reducer';

class _ProductInfo extends Component {
  componentDidMount() {
    const { dispatchFetchProduct, productsById, productId } = this.props;
    if (!productsById[productId]) {
      dispatchFetchProduct(productId);
    }
  }

  onAddClick = () => {
    console.log('clicked');
    const { productId, dispatchAddToCart } = this.props;
    dispatchAddToCart({ productId });
  };

  render() {
    const { loading, productsById, productId } = this.props;
    const product = productsById[productId];
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onAddClick}
            >
              Add To Cart
            </button>
          </div>
          <div className="col-xs-12">
            {product.longDescription.map(desc => (
              <p key={v4()}>{desc}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products: { loading, productsById } }) => ({
  loading,
  productsById,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchProduct: fetchProduct(dispatch),
  // Thunk pattern
  dispatchAddToCart: ({ productId }) => dispatch(addToCart({ productId })),
});

const ProductInfo = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({ match: { params: { productId } } }) => ({
    productId,
  }))
)(_ProductInfo);

export default ProductInfo;
