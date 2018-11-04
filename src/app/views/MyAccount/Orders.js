import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import moment from 'moment';

import Loading from '../../components/Loading';
import { formatPrice } from '../../../../lib/utils';
import { fetchTransactions } from '../../redux/user';

const getDate = date => moment(date).format('MMM D, YYYY');
const getTime = date => moment(date).format('h:mm a');
const getDisplayPrice = price => `$${formatPrice(price)}`;

class _Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionId: null,
    };
  }

  componentDidMount() {
    const { transactions, dispatchFetchTransactions } = this.props;
    if (!transactions) {
      dispatchFetchTransactions();
    }
  }

  renderTransactions = () => {
    const { transactions } = this.props;

    return transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((transaction, i, arr) => (
        <tr key={transaction._id}>
          <td>{arr.length - i}</td>
          <td>{getDate(transaction.date)}</td>
          <td>{getDisplayPrice(transaction.payment.amount)}</td>
          <td>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#orderModal"
              onClick={() => this.setState({ transactionId: transaction._id })}
            >
              View
            </button>
          </td>
        </tr>
      ));
  };

  renderTransaction = transaction => {
    if (!transaction) return null;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <table className="table">
              <tbody>
                <tr>
                  <td>Date</td>
                  <td>{getDate(transaction.date)}</td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td>{getTime(transaction.date)}</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{getDisplayPrice(transaction.payment.amount)}</td>
                </tr>
                <tr>
                  <td>Items</td>
                  <td>
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th />
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transaction.items.map(item => {
                          const { product, quantity } = item;
                          return (
                            <tr>
                              <td>
                                <img
                                  alt={product.images[0].alt}
                                  src={product.images[0].src}
                                  className="rounded float-left img-fluid"
                                />
                              </td>
                              <td>{product.name}</td>
                              <td>{quantity}</td>
                              <td>{getDisplayPrice(product.price)}</td>
                              <td>
                                {getDisplayPrice(product.price * quantity)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  renderModal = () => {
    const { transactionId } = this.state;
    const { transactionsById } = this.props;

    const transaction = transactionsById[transactionId];
    console.log(transaction);

    return (
      <div
        className="modal fade"
        id="orderModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="orderModalTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderModalTitle">
                Your Order Details
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.renderTransaction(transaction)}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { transactions } = this.props;

    if (!transactions) {
      return <Loading message="Fetching your orders" />;
    }

    return (
      <div id="ordersPage" className="container">
        <div className="row">
          <div className="col-xs-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>{this.renderTransactions()}</tbody>
            </table>
          </div>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = ({ user: { transactions, transactionsById } }) => ({
  transactions,
  transactionsById,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchTransactions: () => dispatch(fetchTransactions()),
});

const Orders = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_Orders);

export default Orders;
