import jwt from 'jsonwebtoken';
import '../env.js';

function grabHeadersToken(req) {
  return req.headers.authorization.split(' ')[1];
}

export const authenticate = async function(req, res, next) {
  try {
    const token = grabHeadersToken(req);
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'Please log in first',
        });
      }
    });
  } catch (error) {
    return next({
      status: 401,
      message: 'Please log in first',
    });
  }
};

export const authorize = async function(req, res, next) {
  try {
    const token = grabHeadersToken(req);
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 403,
          message: 'Not authorized',
        });
      }
    });
  } catch (error) {
    return next({
      status: 403,
      message: 'Not authorized',
    });
  }
};
