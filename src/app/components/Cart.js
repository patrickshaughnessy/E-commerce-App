import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { v4 } from 'uuid';

import Loading from './Loading';
import { fetchProducts } from '../redux/products/reducer';
import { updateCart } from '../redux/cart/reducer';

class _Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToCheckout: false,
    };
  }

  componentDidMount() {
    const { dispatchFetchProducts, productsList, loading } = this.props;
    // TODO - add error check as well
    if (!productsList.length && !loading) {
      dispatchFetchProducts();
    }
  }

  onClick = () => {
    console.log('checkout');
    this.setState({ redirectToCheckout: true });
  };

  render() {
    const { items, productsById, productsList, loading } = this.props;

    if (this.state.redirectToCheckout) {
      return <Redirect to="/checkout" />;
    }

    if (!productsList.length || loading) {
      return <Loading message="Hang on, we're loading products" />;
    }

    const total = Number(
      items.reduce(
        (sum, item) => sum + productsById[item.id].price * item.quantity,
        0
      )
    ).toFixed(2);

    return (
      <div className="container cart">
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
              <tbody>
                {items.map(item => {
                  const product = productsById[item.id];
                  if (!product) return null;
                  return (
                    <tr key={v4()}>
                      <td className="productContainer">
                        <div className="productImage">
                          <img
                            alt="product"
                            src={product.images[0]}
                            className="rounded float-left img-fluid"
                          />
                        </div>
                        <div className="productDescription">
                          <p className="name">{product.name}</p>
                          <p className="shortDescription">
                            {product.shortDescription}
                          </p>
                        </div>
                      </td>
                      <td className="font-weight-bold">
                        {`$${Number(product.price * item.quantity).toFixed(2)}`}
                      </td>
                      <td className="font-weight-bold">{item.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
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
        <div className="checkoutButton text-right">
          <button
            type="button"
            className="btn btn-lg btn-primary"
            onClick={this.onClick}
          >
            Checkout
          </button>
        </div>
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
});

const Cart = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_Cart);

export default Cart;
