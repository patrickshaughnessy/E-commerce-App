import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { login } from '../redux/user/reducer';

export class _Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isLoggedIn) {
      this.setState({ redirectToReferrer: true });
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const { dispatchLogin } = this.props;
    const { email, password } = this.state;
    console.log('yo', email, password);
    if (email && password) {
      dispatchLogin({ email, password });
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="w-25" />
          <div className="col">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  name="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </div>
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

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  dispatchLogin: ({ email, password }) => dispatch(login({ email, password })),
});

const Login = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_Login);

export default Login;
