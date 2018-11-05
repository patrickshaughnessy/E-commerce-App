import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { v4 } from 'uuid';

import Loading from '../../components/Loading';
import QuantitySelect from '../../components/QuantitySelect';
import { fetchProducts } from '../../redux/products';
import { updateCart } from '../../redux/cart';
import { formatPrice } from '../../../../lib/utils';

class _Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToCheckout: false,
    };
  }

  componentDidMount() {
    const { dispatchFetchProducts, productsList, loading } = this.props;
    if (!productsList.length && !loading) {
      dispatchFetchProducts();
    }
  }

  onCheckout = () => {
    this.setState({ redirectToCheckout: true });
  };

  renderItems = () => {
    const { productsById, items, dispatchUpdateCart } = this.props;

    if (!items.length) {
      return (
        <tr>
          <td>Nothing in your cart!</td>
        </tr>
      );
    }

    return items.map(item => {
      const product = productsById[item.id];
      if (!product) return null;
      return (
        <tr key={v4()}>
          <td className="productContainer">
            <div className="productImage">
              <img
                alt={product.images[0].alt}
                src={product.images[0].src}
                className="rounded float-left img-fluid"
              />
            </div>
            <div className="productDescription">
              <p className="name">{product.name}</p>
              <p className="shortDescription">{product.shortDescription}</p>
              <button
                type="button"
                className="btn btn-link text-left text-secondary"
                onClick={() =>
                  dispatchUpdateCart({
                    productId: item.id,
                    quantity: 0,
                  })
                }
              >
                <small>Remove</small>
              </button>
            </div>
          </td>
          <td className="font-weight-bold">
            {`$${formatPrice(product.price * item.quantity)}`}
          </td>
          <td className="font-weight-bold">
            <QuantitySelect
              quantity={item.quantity}
              onChange={value =>
                dispatchUpdateCart({
                  productId: item.id,
                  quantity: value,
                })
              }
            />
          </td>
        </tr>
      );
    });
  };

  render() {
    const { items, productsById, productsList, loading } = this.props;

    if (this.state.redirectToCheckout) {
      return <Redirect to="/checkout" />;
    }

    if (!productsList.length || loading) {
      return <Loading message="Hang on, we're loading your cart" />;
    }

    const total = formatPrice(
      items.reduce(
        (sum, item) => sum + productsById[item.id].price * item.quantity,
        0
      )
    );

    return (
      <div id="cartPage" className="container">
        <div className="row">
          <div className="col-xs-12 cartTableContainer">
            <table className="table cartTable">
              <thead>
                <tr>
                  <th scope="col">Shopping Cart</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>{this.renderItems()}</tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="cartSubtotal font-weight-bold text-right">
          <h4>
            {`Subtotal (${items.length} item${
              items.length === 1 ? '' : 's'
            }): $${total}`}
          </h4>
        </div>
        {items.length ? (
          <div className="checkoutButton text-right">
            <button
              type="button"
              className="btn btn-lg btn-primary"
              onClick={this.onCheckout}
            >
              Checkout
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({
  products: { productsById, productsList, loading },
  cart: { items },
}) => ({
  items,
  productsById,
  loading,
  productsList,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchProducts: fetchProducts(dispatch),
  dispatchUpdateCart: ({ productId, quantity }) =>
    dispatch(updateCart({ productId, quantity })),
});

const Cart = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_Cart);

export default Cart;
