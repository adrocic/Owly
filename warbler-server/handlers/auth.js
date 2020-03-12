import * as db from '../models/index.js';
import jwt from 'jsonwebtoken';

export const loginHandler = async function(req, res, next) {
  try {
    const user = await db.User.findOne({
      email: req.body.email,
    });
    const { id, username, profileImageUrl } = user;
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id,
          username,
          profileImageUrl,
        },
        // eslint-disable-next-line no-undef
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token,
      });
    } else {
      return next({ status: 400, message: 'Invalid Email and/or Password' });
    }
  } catch (err) {
    return next({ status: 400, message: 'Invalid Email and/or Password' });
  }
};

export const signupHandler = async function(req, res, next) {
  try {
    const user = await db.User.create(req.body);
    const { id, username, profileImageUrl } = user;
    const token = jwt.sign(
      {
        id,
        user,
        profileImageUrl,
      },
      // eslint-disable-next-line no-undef
      process.env.SECRET_KEY
    );
    return res.status(201).json({
      id,
      username,
      profileImageUrl,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email is taken.';
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};
