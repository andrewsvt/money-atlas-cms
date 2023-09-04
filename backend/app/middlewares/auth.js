const createError = require('http-errors');

const isAuth = (req, res, next) => {
  if (req.session.isAuth) return next();
  return next(createError(403));
};

module.exports = { isAuth };
