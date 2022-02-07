const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
require('dotenv').config();

const User = require('../models/user');
const AuthError = require('./errors');

const adminEmails = process.env.ADMIN_EMAILS || '';

const { JWT_SECRET } = process.env;

const isAdmin = (email) => !!adminEmails.split(',').find((e) => e === email);

const signUp = async ({ email, username, password }) => {
  const emailLc = email.trim().toLowerCase();
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      email: emailLc,
      username,
      password: hashed,
      isAdmin: isAdmin(email),
    });
    return jwt.sign(
      {
        user: { id: user._id, isAdmin: user.isAdmin, username: user.username },
      },
      JWT_SECRET,
      { expiresIn: 60 * 60 }
    );
  } catch (err) {
    if (err.code === 11000) {
      throw new AuthError('Email already exists', err.code);
    } else {
      throw new AuthError('Unable to sign up user');
    }
  }
};

const signIn = async ({ email, password }) => {
  // normalize email address
  const emailLc = email.trim().toLowerCase();

  const user = await User.findOne({ email: emailLc });

  // if no user is found, throw an authentication error
  if (!user) {
    throw new AuthenticationError('Invalid email');
  }

  // if the passwords don't match, throw an authentication error
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AuthenticationError('Error signing in');
  }

  // create and return the json web token
  return jwt.sign(
    { user: { id: user._id, isAdmin: user.isAdmin, username: user.username } },
    JWT_SECRET,
    { expiresIn: 60 * 60 }
  );
};

const getUser = (req) => {
  //   console.log(req?.headers?.authorization);
  const auth = req?.headers?.authorization;
  if (auth) {
    try {
      // Bearer <token>
      const token = auth.slice(7, auth.length);
      console.log(token);
      const verified = jwt.verify(token, JWT_SECRET);
      console.log('verified: ', verified);
      return verified.user;
    } catch {
      throw new AuthError('Session invalid', 401);
    }
  }
  return {};
};

module.exports = {
  signIn,
  signUp,
  getUser,
};
