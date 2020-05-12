const jwt = require('jsonwebtoken');
const { Admin } = require('../models/Admin');

const { UnauthorizedError, InvalidTokenError } = require('../errors/auth.error');
const { AdminNotFoundError } = require('../errors/admin.error');

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if(!authorization) return next(new UnauthorizedError());

  const [, token] = authorization.split(" ");
  if(!token) return next(new InvalidTokenError());

  let payload;
  try {
    payload = jwt.verify(token, process.env.USETELAS_JWT_SECRET);
  } catch(err) {
    return next(new InvalidTokenError());
  }
  if(!payload) return next(new InvalidTokenError());

  const admin = await Admin.findById(payload.id);
  if(!admin) return next(new AdminNotFoundError());

  req.admin = {
    id: payload.id,
    email: admin.email,
  };

  next();
} 
