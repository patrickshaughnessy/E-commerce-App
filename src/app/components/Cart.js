import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { v4 } from 'uuid';

import Loading from './Loading';
import { fetchProduct } from '../redux/products/reducer';
import { updateCart } from '../redux/cart/reducer';

class _Cart extends Component {
  componentDidMount() {
    console.log('cart did mount');
  }

  render() {
    const { items } = this.props;

    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <span>{`Your cart has ${items.length} items`}</span>
            </div>
          </div>
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
