import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { v4 } from 'uuid';

import { formatPrice } from '../../../../lib/utils';
import { fetchProduct } from '../../redux/products';
import { updateCart } from '../../redux/cart';
import Loading from '../../components/Loading';
import ImageSection from './ImageSection';
import QuantitySelect from '../../components/QuantitySelect';

class _Product extends Component {
  constructor(props) {
    super(props);
    const { productId, cart } = props;
    const itemInCart = cart.itemsById[productId];
    this.state = {
      quantity: itemInCart ? itemInCart.quantity : 1,
    };
  }

  componentDidMount() {
    const { dispatchFetchProduct, productsById, productId } = this.props;
    if (!productsById[productId]) {
      dispatchFetchProduct(productId);
    }
  }

  onAddClick = () => {
    const { quantity } = this.state;
    const { productId, dispatchAddToCart } = this.props;
    dispatchAddToCart({ productId, quantity });
  };

  render() {
    const { quantity } = this.state;
    const { loading, productsById, productId, cart } = this.props;
    const product = productsById[productId];

    if (loading || !product) {
      return <Loading message="Fetching your product" />;
    }

    return (
      <div id="productPage" className="container">
        <div className="row topRow">
          <div className="col-xs-12 col-sm-6">
            <ImageSection images={product.images} />
            <hr className="d-block d-sm-none" />
          </div>
          <div className="col-xs-12 col-sm-6">
            <h1>{product.name}</h1>
            <h6 className="price">{`Price: $${formatPrice(product.price)}`}</h6>
            <hr />
            <h4 className="shortDescription">{product.shortDescription}</h4>
            <div className="form-row flex-container">
              <div className="col quantity">
                <label htmlFor="quantitySelect">Quantity</label>
                <QuantitySelect
                  id="quantitySelect"
                  quantity={quantity}
                  onChange={e => this.setState({ quantity: +e.target.value })}
                />
              </div>
              <div className="col addToCart">
                <button
                  type="button"
                  className={`btn btn-lg btn-${
                    cart.itemsById[productId] ? 'success' : 'primary'
                  } ${cart.loading ? 'disabled' : ''}`}
                  onClick={this.onAddClick}
                >
                  {cart.itemsById[productId] ? 'Update Cart' : 'Add To Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row longDescription">
          <div className="col-xs-12">
            <h3>Product Description</h3>
            {product.longDescription.map(desc => (
              <p key={v4()} className="text-justify">
                {desc}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products: { loading, productsById }, cart }) => ({
  loading,
  productsById,
  cart,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchProduct: fetchProduct(dispatch),
  // Thunk pattern
  dispatchAddToCart: ({ productId, quantity }) =>
    dispatch(updateCart({ productId, quantity })),
});

const Product = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({ match: { params: { productId } } }) => ({
    productId,
  }))
)(_Product);

export default Product;
