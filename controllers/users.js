const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

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

  let user;
  try {
    const userData = {
      email,
      password: await bcrypt.hash(password, 10),
    };
    user = await User.create(userData);
  } catch (e) {
    console.log('error creating user', e);
    error = new Error(
      'Sorry, there was a problem creating your account. Please try again.'
    );
    error.status = 400;
    return next(error);
  }

  return res.json({
    success: true,
    userId: user._id,
  });
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
    console.log('isAuthenticated', isAuthenticated);
    error = new Error('Sorry, we could not log you in. Please try again');
    error.status = 401;
    return next(error);
  }

  req.user = user;
  req.user.isLoggedIn = true;

  req.session.userId = user._id;
  // delete req.session.guest;

  return next();
};

const fetchSession = async (req, res, next) => {
  // Fetch user info from loggedin session, then guest session or create new guest session
  let user = {};
  if (req.session.userId) {
    try {
      user = await User.findById(req.session.userId);
      user.isLoggedIn = true;
    } catch (e) {
      console.log('error fetching user data');
    }
  } else if (req.session.guest) {
    user = req.session.guest;
  } else {
    req.session.guest = {
      _id: v4(),
    };
    user = req.session.guest;
  }
  req.user = user;

  req.session.cart = req.session.cart || { items: [] };
  req.cart = req.session.cart;

  return next();
};

const sendResponse = (req, res) => {
  const { user, cart } = req;

  let responseData = {};
  if (user) {
    responseData = {
      id: user._id,
      isLoggedIn: user.isLoggedIn,
      email: maskEmail(user.email),
      firstName: user.firstName,
      lastName: user.lastName,
      cart,
    };
  }

  res.json(responseData);
};

module.exports = {
  create,
  fetchSession,
  login,
  sendResponse,
};
