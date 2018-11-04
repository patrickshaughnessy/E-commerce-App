import React from 'react';

const Orders = () => (
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
          <tbody>
            <tr>
              <td>1</td>
              <td>12/14</td>
              <td>45</td>
              <td>view</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Orders;
