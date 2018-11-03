const _ = require('lodash');
const bcrypt = require('bcrypt');

const { User } = require('../data');
const { maskEmail } = require('../lib/utils');

const create = async (req, res, next) => {
  const { email, password } = req.body;

  let error;
  if (!email || !password) {
    error = new Error('Email and password are required');
    error.status = 400;
    return next(error);
  }

  let userExists;
  try {
    userExists = await User.findOne({ email });
  } catch (e) {
    error = new Error('error checking existing user');
    return next(error);
  }

  if (userExists) {
    console.log('userExists', userExists);
    // Do not reveal that email address exists in the system
    error = new Error('Something went wrong, please try again');
    error.status = 400;
    return next(error);
  }

  try {
    const userData = {
      email,
      password: await bcrypt.hash(password, 10),
    };
    await User.create(userData);
  } catch (e) {
    console.log('error creating user', e);
    error = new Error(
      'Sorry, there was a problem creating your account. Please try again.'
    );
    error.status = 400;
    return next(error);
  }

  return next();
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let error;
  if (!email || !password) {
    error = new Error('Email and password are required');
    error.status = 401;
    return next(error);
  }

  let user;
  let isAuthenticated;
  try {
    user = await User.findOne({ email });
    isAuthenticated = await bcrypt.compare(password, user.password);
  } catch (e) {
    // Only log error serverside
    console.log('Error authenticating user', e);
  }

  if (!user || !isAuthenticated) {
    error = new Error('Sorry, we could not log you in. Please try again');
    error.status = 401;
    return next(error);
  }

  const { _id, id, firstName, lastName } = user;

  req.session.user = {
    _id,
    id,
    email: maskEmail(email),
    firstName,
    lastName,
    isAuthenticated: true,
    cart: req.session.user.cart,
  };
  console.log('login', req.session.user);
  return next();
};

const ensureLoggedIn = async (req, res, next) => {
  if (req.session.user) return next();

  return res.status(401).end();
};

const logout = async (req, res) => {
  try {
    await req.session.destroy();
  } catch (e) {
    console.log('error logging out');
    const error = new Error('Something went wrong');
    error.status = 500;
    throw error;
  }
  console.log('destroyed');
  return res.status(204).end();
};

const updateCart = async (req, res, next) => {
  const { productId, remove } = req.body;

  if (!productId) {
    const error = new Error('Something went wrong');
    error.status = 400;
    return next(error);
  }

  const { cart } = req.session.user;

  if (remove) {
    cart.items = cart.items.filter(item => item.id === productId);
  } else {
    cart.items.push({ id: productId });
  }

  return next();
};

const sendResponse = (req, res) =>
  res.status(200).json(_.omit(req.session.user, '_id'));

module.exports = {
  updateCart,
  create,
  login,
  ensureLoggedIn,
  logout,
  sendResponse,
};
