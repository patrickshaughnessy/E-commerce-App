import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { createUser } from '../redux/user/reducer';

export class _Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const { dispatchCreateUser } = this.props;
    const { email, password, confirmPassword } = this.state;

    const payload = {
      email,
      password,
      confirmPassword,
    };

    return dispatchCreateUser(payload);
  };

  renderFields = () => (
    <Fragment>
      <div className="form-group">
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="email"
          placeholder="Email address"
          name="email"
          onChange={e => this.setState({ email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Create a new password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          aria-describedby="passwordHelp"
          placeholder="Password"
          name="password"
          onChange={e => this.setState({ password: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm your new password:</label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          aria-describedby="confirmPasswordHelp"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={e => this.setState({ confirmPassword: e.target.value })}
        />
      </div>
    </Fragment>
  );

  render() {
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 loginForm">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">Welcome!</h3>
                <p className="card-title text-center">
                  We just need a few details to create your account.
                </p>
                <form>
                  {this.renderFields()}
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                    onClick={this.onSubmit}
                  >
                    Create Account
                  </button>
                </form>
              </div>
              <div className="card-body">
                <small className="form-text text-muted text-center">
                  We'll never share your information with anyone
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchCreateUser: payload => dispatch(createUser(payload)),
});

const Signup = compose(
  connect(
    null,
    mapDispatchToProps
  )
)(_Signup);

export default Signup;
