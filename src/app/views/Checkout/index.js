import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Loading from '../../components/Loading';
import { checkout } from '../../redux/cart';
import { fetchProducts } from '../../redux/products';
import { formatPrice } from '../../../../lib/utils';

export class _Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressName: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
      zip: '',
      card: '',
    };
  }

  componentDidMount() {
    const {
      dispatchFetchProducts,
      products: { productsList, loading },
    } = this.props;
    // TODO - add error check as well
    if (!productsList.length && !loading) {
      dispatchFetchProducts();
    }
  }

  onSubmit = event => {
    event.preventDefault();
    console.log('submit', this.props);
    console.log('yo', this.state);
    const { user, cart, dispatchCheckout } = this.props;
    const {
      addressName,
      addressLineOne,
      addressLineTwo,
      city,
      state,
      zip,
      card,
    } = this.state;

    const payload = {
      user,
      cart,
      address: {
        name: addressName,
        addressLines: [addressLineOne, addressLineTwo],
        city,
        state,
        zip,
      },
      payment: {
        amount: 99.5,
        card,
      },
    };

    return dispatchCheckout(payload);
  };

  renderAddressFields = () => (
    <div className="section">
      <h5>1. Where are we sending your items?</h5>
      <div className="form-group">
        <label htmlFor="addressName">Name</label>
        <input
          type="text"
          className="form-control"
          id="addressName"
          aria-describedby="addressNameHelp"
          placeholder="Name"
          name="addressName"
          onChange={e => this.setState({ addressName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          id="addressLineOne"
          aria-describedby="addressLineOneHelp"
          placeholder="Address line 1"
          name="addressLineOne"
          onChange={e => this.setState({ addressLineOne: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="addressLineTwo"
          aria-describedby="addressLineTwoHelp"
          placeholder="Address line 2"
          name="addressLineTwo"
          onChange={e => this.setState({ addressLineTwo: e.target.value })}
        />
      </div>

      <div className="form-row">
        <div className="col-md-6 mb-3">
          <label htmlFor="validationCustom03">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            aria-describedby="cityHelp"
            placeholder="City"
            name="city"
            onChange={e => this.setState({ city: e.target.value })}
          />
          <div className="invalid-feedback">Please provide a valid city.</div>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="validationCustom04">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            aria-describedby="stateHelp"
            placeholder="State"
            name="state"
            onChange={e => this.setState({ state: e.target.value })}
          />
          <div className="invalid-feedback">Please provide a valid state.</div>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="validationCustom05">Zip</label>
          <input
            type="text"
            className="form-control"
            id="zip"
            aria-describedby="zipHelp"
            placeholder="Zip Code"
            name="zip"
            onChange={e => this.setState({ zip: e.target.value })}
          />
          <div className="invalid-feedback">Please provide a valid zip.</div>
        </div>
      </div>
    </div>
  );

  renderCardField = () => (
    <div className="section">
      <hr />
      <h5>2. Enter payment details</h5>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="card"
          aria-describedby="cardHelp"
          placeholder="Credit Card"
          name="card"
          onChange={e => this.setState({ card: e.target.value })}
        />
      </div>
    </div>
  );

  renderItemReview = () => {
    const { products, cart } = this.props;

    if (!products.productsList.length || products.loading) {
      return <Loading message="Hang on, we're loading your cart" />;
    }

    return (
      <div className="section">
        <hr />
        <h5>3. Review your items</h5>
        <table className="table itemReview">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col" />
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(item => {
              const product = products.productsById[item.id];
              return (
                <tr>
                  <td>
                    <img
                      alt={product.images[0].alt}
                      src={product.images[0].src}
                      className="img-fluid shadow p-3 bg-white rounded"
                    />
                  </td>
                  <td>
                    <p className="text-left font-weight-bold">{product.name}</p>
                  </td>
                  <td>{`${item.quantity} x $${formatPrice(product.price)}`}</td>
                  <td>{`$${formatPrice(product.price * item.quantity)}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  renderTotals = () => {
    const {
      products: { productsList, productsById, loading },
      cart,
    } = this.props;

    if (!productsList.length || loading) {
      return <Loading message="Hang on, we're loading your cart" />;
    }

    const subtotal = cart.items.reduce(
      (sum, item) => sum + productsById[item.id].price * item.quantity,
      0
    );
    const tax = subtotal * 0.15;
    return (
      <div className="section">
        <hr />
        <div className="totalsTable">
          <table className="table-borderless text-right">
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td>{`$${formatPrice(subtotal)}`}</td>
              </tr>
              <tr>
                <td>Tax:</td>
                <td>{`$${formatPrice(tax)}`}</td>
              </tr>
              <tr>
                <td>Shipping:</td>
                <td>{`$${formatPrice(0)}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr className="totalHr" />
        <h3 className="text-right">
          {`Total: $${formatPrice(subtotal + tax)}`}
        </h3>
      </div>
    );
  };

  render() {
    return (
      <div id="checkoutPage" className="container">
        <div className="row align-items-center">
          <div className="col-md-6 checkoutForm">
            <h1 className="text-center">Checkout</h1>
            <p className="text-center">Please enter your information below</p>
            <hr />
            <form>
              {this.renderAddressFields()}
              {this.renderCardField()}
              {this.renderItemReview()}
              {this.renderTotals()}
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                onClick={this.onSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart, products }) => ({
  user,
  cart,
  products,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchProducts: fetchProducts(dispatch),
  dispatchCheckout: payload => dispatch(checkout(payload)),
});

const Checkout = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_Checkout);

export default Checkout;
