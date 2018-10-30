import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { v4 } from 'uuid';

import Loading from './Loading';
import { fetchProduct } from '../redux/products/reducer';
import { updateCart } from '../redux/cart/reducer';

class _ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
    };
  }

  componentDidMount() {
    const { dispatchFetchProduct, productsById, productId } = this.props;
    if (!productsById[productId]) {
      dispatchFetchProduct(productId);
    }
  }

  onAddClick = () => {
    console.log('clicked');
    const { number } = this.state;
    const { productId, dispatchAddToCart } = this.props;
    dispatchAddToCart({ productId, number });
  };

  render() {
    const { loading, productsById, productId } = this.props;
    const product = productsById[productId];
    // console.log('product', this.props);
    if (loading || !product) {
      return <Loading message="Fetching your product" />;
    }

    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <img src={product.images[0]} />
            </div>
            <div className="col-xs-12 col-sm-6">
              <h1>{product.name}</h1>
              <h6>{`$${product.price}`}</h6>
              <h5>{product.shortDescription}</h5>
              <input
                type="number"
                value={this.state.number}
                onChange={e => this.setState({ number: +e.target.value })}
              />
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
      </Fragment>
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
  dispatchAddToCart: ({ productId, number }) =>
    dispatch(updateCart({ productId, number })),
});

const ProductInfo = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({ match: { params: { productId } } }) => ({
    productId,
  }))
)(_ProductInfo);

export default ProductInfo;
