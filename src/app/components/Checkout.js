import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { checkout } from '../redux/cart/reducer';

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
    <Fragment>
      <div className="form-group">
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
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="city"
          aria-describedby="cityHelp"
          placeholder="City"
          name="city"
          onChange={e => this.setState({ city: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="state"
          aria-describedby="stateHelp"
          placeholder="State"
          name="state"
          onChange={e => this.setState({ state: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="zip"
          aria-describedby="zipHelp"
          placeholder="Zip Code"
          name="zip"
          onChange={e => this.setState({ zip: e.target.value })}
        />
      </div>
    </Fragment>
  );

  renderCardField = () => (
    <Fragment>
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
    </Fragment>
  );

  render() {
    console.log('checkout');
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="w-25" />
          <div className="col">
            <form>
              {this.renderAddressFields()}
              {this.renderCardField()}
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.onSubmit}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="w-25" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart }) => ({ user, cart });

const mapDispatchToProps = dispatch => ({
  dispatchCheckout: payload => dispatch(checkout(payload)),
});

const Checkout = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_Checkout);

export default Checkout;
