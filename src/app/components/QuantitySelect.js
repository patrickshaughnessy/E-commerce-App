import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { v4 } from 'uuid';

class _QuantitySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCustomQuantity: false,
    };
  }

  render() {
    const { isCustomQuantity } = this.state;
    const { quantity, onChange, className, id } = this.props;

    const quantityOptions = Array(10)
      .fill(1)
      .map((opt, i) => (
        <option key={v4()} value={i + 1}>
          {i + 1}
        </option>
      ));

    return (
      <Fragment>
        {isCustomQuantity ? (
          <input type="number" onChange={onChange} />
        ) : (
          <select
            defaultValue={quantity}
            onChange={onChange}
            className={`form-control ${className || ''}`}
            id={id}
          >
            {quantityOptions}
          </select>
        )}
      </Fragment>
    );
  }
}

const QuantitySelect = compose()(_QuantitySelect);

export default QuantitySelect;
