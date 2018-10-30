import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { v4 } from 'uuid';

import Loading from './Loading';
import { fetchProduct } from '../redux/products/reducer';
import { updateCart } from '../redux/cart/reducer';

class _Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToCheckout: false,
    };
  }

  componentDidMount() {
    console.log('cart did mount');
  }

  onClick = () => {
    console.log('checkout');
    this.setState({ redirectToCheckout: true });
  };

  render() {
    const { items } = this.props;

    if (this.state.redirectToCheckout) {
      return <Redirect to="/checkout" />;
    }

    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <p>{`Your cart has ${items.length} items`}</p>
            </div>
            <br />
            <div className="col-xs-12">
              {items.map(item => (
                <p key={item.id}>{`item: ${item.id}, num: ${item.number}`}</p>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.onClick}
          >
            Checkout
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ cart: { items } }) => ({
  items,
});

const mapDispatchToProps = dispatch => ({});

const Cart = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_Cart);

export default Cart;
