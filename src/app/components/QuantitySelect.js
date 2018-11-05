import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { v4 } from 'uuid';

class _QuantitySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customQuantity: props.quantity >= 10 ? props.quantity : false,
    };
  }

  handleCustomInput = e => {
    this.setState({ customQuantity: +e.target.value });
  };

  handleChange = e => {
    const { onChange } = this.props;
    const { value } = e.target;

    if (value === 'custom') {
      this.setState({ customQuantity: 10 });
      return onChange(10);
    }

    return onChange(value);
  };

  render() {
    const { customQuantity } = this.state;
    const { quantity, onChange, className, id } = this.props;

    const quantityOptions = Array(9)
      .fill(1)
      .map((opt, i) => (
        <option key={v4()} value={i + 1}>
          {i + 1}
        </option>
      ))
      .concat(
        <option key={v4()} value="custom">
          10+
        </option>
      );

    return (
      <Fragment>
        {customQuantity ? (
          <input
            type="number"
            className="form-control"
            value={customQuantity}
            onChange={this.handleCustomInput}
            onBlur={() => onChange(customQuantity)}
          />
        ) : (
          <select
            value={quantity}
            onChange={this.handleChange}
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
