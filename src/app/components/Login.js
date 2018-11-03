import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
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
          <div className="col-md-6 loginForm">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">
                  Login To Your Account
                </h3>
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                    onClick={this.onSubmit}
                  >
                    Submit
                  </button>
                </form>
                <div className="card-body text-center">
                  <small id="loginHelp" className="form-text text-muted">
                    Not registered?
                  </small>
                  <Link to="/signup" className="card-link">
                    Create an account
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
